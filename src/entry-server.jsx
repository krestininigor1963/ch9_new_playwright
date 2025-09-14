import ReactDOMServer from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { routes } from './routes.jsx'
import { createFetchRequest } from './request.js'
import { App } from './App.jsx'

// Определите статический обработчик для маршрутов:
const handler = createStaticHandler(routes)

// Настройте функцию рендеринга так, чтобы она принимала объект запроса Express,
export async function render(req) {
  //  а затем создайте из него запрос Fetch, используя нашу ранее определенную функцию:
  const fetchRequest = createFetchRequest(req)

  // Теперь мы можем использовать этот преобразованный запрос для передачи его нашему статическому обработчику,
  // который создает контекст для маршрута, позволяя React Router видеть, к какому маршруту мы пытаемся получить доступ и с какими параметрами:
  const context = await handler.query(fetchRequest)

  //Из маршрутов, определенных обработчиком и контекстом, мы можем создать статический маршрутизатор:
  const router = createStaticRouter(handler.dataRoutes, context)

  //return ReactDOMServer.renderToString(<App />)

  // Наконец, мы можем настроить рендеринг для отображения статического маршрутизатора и нашей переработанной структуры приложения:
  return ReactDOMServer.renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>,
  )
}
