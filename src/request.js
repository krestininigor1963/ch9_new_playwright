
export function createFetchRequest(req) {
  // Сначала определите источник запроса и создайте URL-адрес:
  const origin = `${req.protocol}://${req.get('host')}`
  const url = new URL(req.originalUrl || req.url, origin)

  // Затем мы определяем новый AbortController для обработки закрытия запроса:
  const controller = new AbortController()
  req.on('close', () => controller.abort())

  // Далее мы сопоставляем заголовки запроса Express с заголовками Fetch:
  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (!values) continue
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value)
      }
    } else {
      headers.set(key, values)
    }
  }

  // Теперь мы можем создать объект init для запроса Fetch, который состоит из метода, заголовков и AbortController:
  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  // Если наш запрос не был запросом GET или HEAD, мы также получаем тело, поэтому давайте добавим его к запросу Fetch:
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  // Наконец, давайте создадим объект запроса на выборку из нашей извлеченной информации:
  return new Request(url.href, init)
}

//Теперь, когда у нас есть вспомогательная функция для преобразования запроса Express в запрос Fetch, мы можем использовать ее 
// для определения маршрутизатора на стороне сервера.
