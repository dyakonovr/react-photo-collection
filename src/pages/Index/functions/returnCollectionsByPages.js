export function returnCollectionsByPages(array, collectionsOnPage) { // Создаю "страницы" в новом обработанном массиве коллекций
  // Создаю вспомогательный массив
  let collectionsByPage = [];

  // Если кол-во коллекций конкретной категории, деленных на collectionsOnPage >, чем одна == страниц больше, чем одна
  if (array.length / collectionsOnPage > 1) {
    // Перебираю весь массив
    for (let i = 0; i < array.length; i++) {
      // Если коллекция должна быть на след. странице
      if ((i / collectionsOnPage) === Math.ceil(i / collectionsOnPage)) {
        // Создаём новую страницу и добавляем её туда
        collectionsByPage.push([array[i]]);
      }
      // Иначе
      else {
        // Добавляем её в массив конкретной страницы
        collectionsByPage[collectionsByPage.length - 1].push(array[i]);
      }
    }
    // Обновляем отсортированный по старницам массив в объекте всех коллекций
    return collectionsByPage;
  } else { // Если страница только одна
    return [array];
  }
}