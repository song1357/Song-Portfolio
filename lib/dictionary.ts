//这段代码是一个使用 JavaScript (或 TypeScript) 编写的模块，它看起来是用于动态加载不同语言的词典文件。
import 'server-only'
//这行代码可能是一个特殊的指令，用于表明该模块仅在服务器端运行。
import type { Locale } from '@/i18n.config'
//这行代码从项目的 i18n.config 文件中导入 Locale 类型。这表明 Locale 类型用于国际化（i18n）配置，可能是用来表示不同的语言或地区设置。
//'@' 是一个路径别名，通常在项目配置中定义，用于简化模块导入路径。

const dictionaries = {
  'en': () => import('@/dictionaries/en.json').then(module => module.default),
  'zh': () => import('@/dictionaries/zh.json').then(module => module.default)
}
//这是一个字典对象，其键是语言名称，值是函数。这些函数使用动态 import() 语句来异步加载相应的词典文件。
//import('@/dictionaries/en.json') 动态加载英文词典文件，import('@/dictionaries/zh.json') 加载中文词典文件。
//.then(module => module.default) 用于获取模块的默认导出。

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
//这行代码定义并导出一个异步函数 getDictionary。
//函数接收一个 Locale 类型的参数 locale，这个参数指定要加载的词典的语言。
//dictionaries[locale]() 根据传入的 locale 值动态调用上面定义的相应函数，加载并返回对应语言的词典。

