import type { Plugin } from 'vite'
import { readFile, writeFile, watchFile } from 'fs'
import { join } from 'path'

export default function PagesJsonTypes(): Plugin {
  return {
    name: 'vite-plugin-pages-json-types',
    enforce: 'post',
    apply: 'serve',
    configureServer() {
      const cwd = process.cwd()
      const jsonFilePath = join(cwd, 'src/pages.json')
      const dtsFilePath = join(cwd, 'src/pages.d.ts')

      // 定义一个函数来读取 JSON 并写入 DTS 文件
      const updatePagesTs = () => {
        readFile(jsonFilePath, 'utf-8', (err, data) => {
          if (err) return console.error('读取 pages.json 文件失败:', err)

          try {
            let json
            try {
              json = JSON.parse(data)
            } catch {
              // 使用正则表达式去除所有注释（单行和多行）
              json = JSON.parse(data.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ''))
            }

            const pages = json.pages.map((page) => '/' + page.path)
            const subPackagesPages = json.subPackages?.reduce((acc, cur) => {
              cur.pages.forEach((page) => { acc.push('/' + join(cur.root, page.path)) })
              return acc
            }, []) || []
            const tabBarPages = json.tabBar?.list.map((item) => '/' + item.pagePath) || []
            const dtsContent =
              'export type Pages = ' +
              JSON.stringify(pages.concat(subPackagesPages), null, 2) +
              '\n' +
              'export type TabBarPages = ' +
              JSON.stringify(tabBarPages, null, 2) +
              '\n' +
              'export type PagesConfig = ' +
              JSON.stringify(json, null, 2)

            writeFile(dtsFilePath, dtsContent, 'utf-8', (err) => {
              if (err) console.error('写入 pages.d.ts 文件失败:', err)
            })
          } catch (error) {
            console.error('pages.json 文件格式错误:', error)
          }
        })
      }

      watchFile(jsonFilePath, (cur, pre) => cur.mtime !== pre.mtime && updatePagesTs())

      // 开发服务器启动时执行一次写入
      updatePagesTs()
    }
  }
}
