/**
 * 读取配置文件
 */
export async function readConfig<T = any>(configPath: string): Promise<T> {
  const config = await import(configPath)
  return config.default || config
}
