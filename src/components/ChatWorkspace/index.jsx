import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chat } from '/src/components/Chat';
import { Sidebar } from '/src/components/Sidebar';
import { useAuth } from '/src/contexts/authContext';
import { getUserChats } from '/src/lib/api';

function getChatId(chat) {
  return chat?.id || chat?._id || null;
}

function sortByLatest(chats) {
  return [...chats].sort((first, second) => {
    const firstDate = new Date(first.updatedAt || first.createdAt || 0).getTime();
    const secondDate = new Date(second.updatedAt || second.createdAt || 0).getTime();
    return secondDate - firstDate;
  });
}

export function ChatWorkspace() {
  const navigate = useNavigate();
  const { token, authLoading, requestWithAuth } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [isNewChatDraft, setIsNewChatDraft] = useState(false);

  useEffect(() => {
    if (!authLoading && !token) {
      navigate('/signin');
    }
  }, [authLoading, navigate, token]);

  const refreshChats = useCallback(async () => {
    if (!token) {
      setChats([]);
      setActiveChatId(null);
      return;
    }

    setHistoryLoading(true);
    setHistoryError('');

    try {
      const response = await requestWithAuth((accessToken) => getUserChats(accessToken));
      const nextChats = sortByLatest(Array.isArray(response) ? response : []);
      setChats(nextChats);

      if (!nextChats.length) {
        setActiveChatId(null);
        return;
      }

      if (isNewChatDraft) {
        return;
      }

      const hasSelected = nextChats.some((chat) => getChatId(chat) === activeChatId);

      if (!hasSelected) {
        setActiveChatId(getChatId(nextChats[0]));
      }
    } catch (error) {
      setHistoryError(error.message || 'Não foi possível carregar o histórico.');
    } finally {
      setHistoryLoading(false);
    }
  }, [activeChatId, isNewChatDraft, requestWithAuth, token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    refreshChats();
  }, [refreshChats, token]);

  const handleChatUpdated = useCallback((updatedChat) => {
    const updatedId = getChatId(updatedChat);

    if (!updatedId) {
      return;
    }

    setIsNewChatDraft(false);
    setChats((currentChats) => {
      const filtered = currentChats.filter((chat) => getChatId(chat) !== updatedId);
      return sortByLatest([updatedChat, ...filtered]);
    });
    setActiveChatId(updatedId);
  }, []);

  const handleCreateChat = useCallback(() => {
    setIsNewChatDraft(true);
    setActiveChatId(null);
  }, []);

  const handleSelectChat = useCallback((chatId) => {
    setIsNewChatDraft(false);
    setActiveChatId(chatId);
  }, []);

  const activeChat = useMemo(
    () => chats.find((chat) => getChatId(chat) === activeChatId) || null,
    [activeChatId, chats],
  );

  return (
    <div className="chat-shell">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        isLoading={historyLoading}
        errorMessage={historyError}
        onSelectChat={handleSelectChat}
        onCreateChat={handleCreateChat}
        onRefreshChats={refreshChats}
      />
      <Chat activeChat={activeChat} onChatUpdated={handleChatUpdated} />
    </div>
  );
}
