export function elementHoverHandle(e, type, parentRef) { // Обрабатываю фокус на элемент
  if (type === 'ENTER') { // Если мы наводим курс
    const focusedElement = e.currentTarget; // Находим элемент, на который навелись
    focusedElement.dataset.focused = true; // Меняем его data-атрибут (data-focused) на true
  } else { // Иначе
    let collectionsChildActive = parentRef.querySelector('[data-focused=true]'); // Находим активный элемент
    collectionsChildActive.dataset.focused = false; // Меняем его data-атрибут (data-focused) на false
  }
}