export function ApiFalldownScreen() {
  return (
    <div className="flex h-dvh w-screen flex-col items-center justify-center bg-gray-950 text-slate-200 px-6 text-center select-none">
      <div className="animate-bounce mb-6 text-6xl">⚠️</div>
      <h1 className="text-4xl font-bold text-red-500 mb-4">Связь с сервером потеряна</h1>
      <p className="text-xl text-slate-400 max-w-md mb-8">
        Локальный сервер терминала или база данных недоступны. Проверьте сетевое подключение или
        обратитесь к системному администратору.
      </p>
    </div>
  );
}
