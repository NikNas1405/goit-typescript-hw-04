// У вас є компонент React, який використовує useRef та IntersectionObserver для визначення, коли користувач переглядає кінець вмісту. Ваше завдання полягає в наступному:
// Встановіть правильні типи пропсів для цього компонента. У ньому є дві властивості: children і onContentEndVisible. children - це будь-який валідний React вузол, а onContentEndVisible - це функція без аргументів, що повертає void.
// Встановіть правильний тип useRef. Посилання endContentRef використовується для div, який міститься в кінці вмісту.
// Встановіть правильний тип для options (клас також може бути типом для options). // options тип: Використано вбудований у TypeScript тип IntersectionObserverInit для типізації об'єкта options при створенні екземпляра IntersectionObserver. root: DOM-елемент, який використовується як корінь для відстеження відображення. За замовчуванням null. rootMargin: Рядок, який представляє відступи для кореня. Може бути вказаний в форматі CSS, наприклад, "10px 20px 30px 40px". За замовчуванням "0px". threshold: Список значень порогу, які визначають, яка частина цільового елемента повинна бути видимою, щоб викликати зворотний виклик. Це може бути число або масив чисел. За замовчуванням 0. У нашому випадку options використовується для налаштування параметрів, за допомогою яких IntersectionObserver буде визначати, коли цільовий елемент (в нашому випадку, елемент з посиланням endContentRef) стає видимим.

//1 варіант
import React, { useEffect, useRef } from "react";
// Опишіть Props //+
type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо   //+
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип        //+

    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}

// 2 варіант
// import React, { useEffect, useRef } from "react";

// type Options = {
//   rootMargin: string;
//   threshold: number;
//   root: null;
// };

// type Props = {
//   children: React.ReactNode;
//   onContentEndVisible: () => void;
// };

// export function Observer({ children, onContentEndVisible }: Props) {
//   const endContentRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const options: Options = {
//       rootMargin: "0px",
//       threshold: 1.0,
//       root: null,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.intersectionRatio > 0) {
//           onContentEndVisible();
//           observer.disconnect();
//         }
//       });
//     }, options);

//     if (endContentRef.current) {
//       observer.observe(endContentRef.current);
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [onContentEndVisible]);

//   return (
//     <div>
//       {children}
//       <div ref={endContentRef} />
//     </div>
//   );
// }
