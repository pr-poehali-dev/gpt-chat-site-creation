import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState<'chat' | 'pricing' | 'features' | 'contact'>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я GPT-ассистент. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Новый чат', lastMessage: 'Привет! Я GPT-ассистент...' },
    { id: '2', title: 'Помощь с кодом', lastMessage: 'Как создать React компонент?' },
    { id: '3', title: 'Идеи для проекта', lastMessage: 'Подскажи идеи стартапа' },
  ]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Это демо-ответ. Подключите API для реального GPT!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const renderChat = () => (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <div className="w-64 glass border-r border-white/10 flex flex-col animate-slide-in-right">
          <div className="p-4 border-b border-white/10">
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              onClick={() => setMessages([{
                id: Date.now().toString(),
                role: 'assistant',
                content: 'Привет! Я GPT-ассистент. Чем могу помочь?',
                timestamp: new Date(),
              }])}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Новый чат
            </Button>
          </div>

          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg glass hover:bg-white/10 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {chat.title}
                    </h4>
                    <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{chat.lastMessage}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-lg glass">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-xs">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Пользователь</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
              <Icon name="Settings" size={16} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 glass">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-white/10"
            >
              <Icon name={sidebarOpen ? 'PanelLeftClose' : 'PanelLeftOpen'} size={20} />
            </Button>
            <h2 className="text-lg font-semibold gradient-text">GPT Chat</h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow mr-2" />
              Онлайн
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, idx) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-fade-in ${message.role === 'user' ? 'justify-end' : ''}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                      <Icon name="Bot" size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'glass'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-gradient-to-r from-secondary to-accent text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/10 glass">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Введите сообщение..."
                className="flex-1 glass border-white/20 focus:border-primary transition-colors"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                size="icon"
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              GPT может ошибаться. Проверяйте важную информацию.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">Тарифы и цены</h1>
          <p className="text-muted-foreground text-lg">Выберите план, который подходит вам</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Free',
              price: '0₽',
              features: ['10 запросов в день', 'Базовая модель GPT', 'История чатов', 'Email поддержка'],
              popular: false,
            },
            {
              name: 'Pro',
              price: '999₽',
              features: ['Безлимитные запросы', 'GPT-4 Turbo', 'Приоритетная поддержка', 'API доступ', 'Кастомные настройки'],
              popular: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              features: ['Все из Pro', 'Dedicated support', 'SLA гарантии', 'On-premise опция', 'Обучение команды'],
              popular: false,
            },
          ].map((plan, idx) => (
            <Card
              key={plan.name}
              className={`p-6 glass hover:scale-105 transition-all duration-300 animate-fade-in ${
                plan.popular ? 'border-primary border-2' : ''
              }`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {plan.popular && (
                <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary">Популярный</Badge>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-muted-foreground">/месяц</span>}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-secondary'
                    : 'glass hover:bg-white/10'
                }`}
              >
                Выбрать план
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">Возможности</h1>
          <p className="text-muted-foreground text-lg">Мощный AI-ассистент для ваших задач</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: 'MessageSquare',
              title: 'Умный диалог',
              description: 'Контекстное понимание разговора и запоминание предыдущих сообщений',
            },
            {
              icon: 'Code',
              title: 'Помощь с кодом',
              description: 'Генерация, объяснение и отладка кода на любых языках программирования',
            },
            {
              icon: 'PenTool',
              title: 'Креативное письмо',
              description: 'Создание текстов, статей, сценариев и креативного контента',
            },
            {
              icon: 'Languages',
              title: 'Перевод',
              description: 'Точный перевод текстов на более чем 50 языков мира',
            },
            {
              icon: 'BookOpen',
              title: 'Обучение',
              description: 'Объяснение сложных концепций простым языком с примерами',
            },
            {
              icon: 'Sparkles',
              title: 'Генерация идей',
              description: 'Брейнштормы, креативные решения и нестандартные подходы',
            },
          ].map((feature, idx) => (
            <Card
              key={feature.title}
              className="p-6 glass hover:scale-105 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon as any} size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-12 p-8 glass animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Молниеносные ответы</h3>
              <p className="text-muted-foreground">
                Получайте ответы на ваши вопросы за секунды благодаря передовым технологиям AI
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-4">Контакты</h1>
          <p className="text-muted-foreground text-lg">Свяжитесь с нами по любым вопросам</p>
        </div>

        <Card className="p-8 glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <Input placeholder="Ваше имя" className="glass border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input type="email" placeholder="your@email.com" className="glass border-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Сообщение</label>
              <textarea
                placeholder="Расскажите, чем мы можем помочь..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Icon name="Send" size={16} className="mr-2" />
              Отправить сообщение
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: 'Mail', title: 'Email', value: 'hello@gptchat.com' },
            { icon: 'Phone', title: 'Телефон', value: '+7 (999) 123-45-67' },
            { icon: 'MapPin', title: 'Адрес', value: 'Москва, Россия' },
          ].map((contact, idx) => (
            <Card
              key={contact.title}
              className="p-4 glass text-center hover:scale-105 transition-all animate-fade-in"
              style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
            >
              <Icon name={contact.icon as any} size={20} className="mx-auto mb-2 text-primary" />
              <p className="text-xs text-muted-foreground mb-1">{contact.title}</p>
              <p className="text-sm font-medium">{contact.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-14 border-b border-white/10 glass backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Icon name="Bot" size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">GPT Chat</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentSection('chat')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'chat' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Чат
            </button>
            <button
              onClick={() => setCurrentSection('features')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'features' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Возможности
            </button>
            <button
              onClick={() => setCurrentSection('pricing')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'pricing' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Тарифы
            </button>
            <button
              onClick={() => setCurrentSection('contact')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentSection === 'contact' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Контакты
            </button>
          </div>

          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            Войти
          </Button>
        </div>
      </nav>

      <main className="pt-14">
        {currentSection === 'chat' && renderChat()}
        {currentSection === 'pricing' && renderPricing()}
        {currentSection === 'features' && renderFeatures()}
        {currentSection === 'contact' && renderContact()}
      </main>
    </div>
  );
}
