import React, { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type ChildName =
  | 'Дея'
  | 'Иван'
  | 'Саша'
  | 'Никита'
  | 'Злата'
  | 'Алиса'
  | 'Агния'
  | 'Кирилл'
  | 'Ая'
  | 'Дима'
  | 'Аскар'
  | 'Миша'
  | 'Вера';

interface CopiedChild {
  name: ChildName;
  generatedText: string;
}

const TextGenerator: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [childName, setChildName] = useState<ChildName>('Дея');
  const [dynamicText, setDynamicText] = useState<string>('');
  const [completedText, setCompletedText] = useState<string>('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [copiedChildren, setCopiedChildren] = useState<CopiedChild[]>([]);
  const [finalText, setFinalText] = useState<string>('');
  const [russianLanguage, setRussianLanguage] = useState<string>('');
  const [mathematics, setMathematics] = useState<string>('');
  const [reading, setReading] = useState<string>('');
  const [worldAround, setWorldAround] = useState<string>('');
  const [showRussian, setShowRussian] = useState<boolean>(false);
  const [showMath, setShowMath] = useState<boolean>(false);
  const [showReading, setShowReading] = useState<boolean>(false);
  const [showWorld, setShowWorld] = useState<boolean>(false);

  const getParentName = (name: ChildName): string => {
    switch (name) {
      case 'Дея':
        return 'Владимир';
      case 'Никита':
        return 'Анастасия';
      case 'Злата':
        return 'Ирина';
      case 'Агния':
        return 'Юлия';
      case 'Ая':
        return 'Александр';
      case 'Дима':
        return 'Александра';
      case 'Миша':
        return 'Дарина';
      case 'Аскар':
        return 'Анастасия';
      case 'Алиса':
        return 'Наталия';
      case 'Вера':
        return 'Алина';
      default:
        return '';
    }
  };

  const generateText = () => {
    const parentNameToShow = getParentName(childName);
    const greeting = `${parentNameToShow}, здравствуйте!`;
    const thisWeek = `На этой неделе ${childName}`;
    let fullText = `${greeting}\n${thisWeek}\n${dynamicText}. На уроках мы проходили: `;

    if (showRussian) fullText += `\nРусский язык: ${russianLanguage}.`;
    if (showMath) fullText += `\nМатематика: ${mathematics}.`;
    if (showReading) fullText += `\nЧтение: ${reading}.`;
    if (showWorld) fullText += `\nОкружающий мир: ${worldAround}.`;

    setGeneratedText(fullText);
    setCopied(false);
  };

  const generatedTextRef = useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (copied) {
      const textToCopy = generatedTextRef.current?.textContent || '';
      const cleanedText = textToCopy.trim();
      setCopiedChildren((prevCopiedChildren) => [
        ...prevCopiedChildren,
        { name: childName, generatedText: cleanedText },
      ]);
    }
  }, [copied, childName]);

  const handleCopy = () => {
    const textToCopy = generatedTextRef.current?.textContent || '';
    const cleanedText = textToCopy.trim();
    navigator.clipboard.writeText(cleanedText).then(() => {
      setCopied(true);
    });
  };

  const setCopiedClean = () => {
    setFinalText('');
    setCopiedChildren([]);
  };

  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="w-[600px] p-4 border rounded-lg shadow-lg bg-white p-10">
        <div className="mb-4">
          <p className="text-lg font-semibold mb-5"> Имя Родителя: {getParentName(childName)}</p>
          <label htmlFor="childName" className="text-lg font-semibold">
            Имя ребёнка:
          </label>
          <select
            id="childName"
            value={childName}
            onChange={(e) => {
              setCopied(false);
              setChildName(e.target.value as ChildName);
            }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            {[
              'Дея',
              'Никита',
              'Злата',
              'Алиса',
              'Агния',
              'Ая',
              'Дима',
              'Миша',
              'Аскар',
              'Вера',
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dynamicText" className="text-lg font-semibold">
            На этой неделе {childName}
          </label>
          <textarea
            id="dynamicText"
            placeholder="Сюда написать как ребёнок себя вёл и чувствовал"
            value={dynamicText}
            onChange={(e) => setDynamicText(e.target.value)}
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
          />
        </div>
        <div className="mb-4">
          <div>
            <label>
              <input
                type="checkbox"
                checked={showRussian}
                onChange={() => setShowRussian(!showRussian)}
              />
              Русский язык
            </label>
            {showRussian && (
              <textarea
                placeholder="Русский язык подробности"
                value={russianLanguage}
                onChange={(e) => setRussianLanguage(e.target.value)}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
              />
            )}
          </div>
          <div>
            <label>
              <input
                className="mt-5"
                type="checkbox"
                checked={showMath}
                onChange={() => setShowMath(!showMath)}
              />
              Математика
            </label>
            {showMath && (
              <textarea
                placeholder="Темы, которые проходили в уроках"
                value={mathematics}
                onChange={(e) => setMathematics(e.target.value)}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
              />
            )}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={showReading}
                onChange={() => setShowReading(!showReading)}
                className="mt-5"
              />
              Чтение
            </label>
            {showReading && (
              <textarea
                placeholder="Тема, которую проходили в уроках"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
              />
            )}
          </div>
          <div>
            <label>
              <input
                className="mt-5"
                type="checkbox"
                checked={showWorld}
                onChange={() => setShowWorld(!showWorld)}
              />
              Мир
            </label>
            {showWorld && (
              <textarea
                placeholder="Мир подробности"
                value={worldAround}
                onChange={(e) => setWorldAround(e.target.value)}
                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
              />
            )}
          </div>
        </div>
        <button
          onClick={generateText}
          className="w-full py-2 mt-2 text-white bg-blue-500 border border-blue-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Сгенерировать текст
        </button>

        {generatedText && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Готовый текст:</h2>
            <p className="mt-4" ref={generatedTextRef}>
              {generatedText}
            </p>
            <CopyToClipboard text={generatedTextRef.current?.textContent || ''} onCopy={handleCopy}>
              <button
                onClick={handleCopy}
                className={`mt-4  py-2 px-2 mt-2 text-white ${
                  copied ? 'bg-green-500' : 'bg-blue-500'
                } border border-${copied ? 'green-600' : 'blue-600'} rounded-md hover:bg-${
                  copied ? 'green-600' : 'blue-600'
                } focus:outline-none focus:ring focus:border-${copied ? 'green-300' : 'blue-300'}`}>
                {copied ? 'Скопирован!' : 'Скопировать для отправки'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
      {copiedChildren.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Скопированные имена детей:</h2>
          <ul className="grid grid-cols-2 gap-4">
            {copiedChildren.map((child, index) => (
              <li
                key={index}
                className="p-2 text-lg bg-gray-100 rounded-md shadow hover:bg-yellow-600 hover:text-white hover:cursor-pointer"
                onClick={() => {
                  setFinalText(child.generatedText);
                }}>
                {child.name}
              </li>
            ))}
          </ul>
          <button
            onClick={setCopiedClean}
            className="w-full py-2 mt-4 mb-4 text-white bg-red-600 border border-white-600 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300">
            Очистить список
          </button>
        </div>
      )}
      <p className="pb-5  text-xl">{finalText}</p>
    </div>
  );
};

export default TextGenerator;
