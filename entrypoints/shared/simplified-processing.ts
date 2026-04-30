/**
 * 简化处理
 * @param enableSimplifiedProcessing - 是否启用简化处理
 * @param copy - 拷贝的内容
 * @param fallbackCopyContent - 备用拷贝的内容
 * @returns 简化处理结果
 * @returns { simplifiedActive: boolean; resolvedCopy: string }
 */
export function resolveSimplifiedProcessing({
  enableSimplifiedProcessing,
  copy,
  fallbackCopyContent = ''
}: {
  enableSimplifiedProcessing: boolean;
  copy?: string | null;
  fallbackCopyContent?: string;
}) {
  const resolvedCopy =
    (copy != null && String(copy).trim()) || fallbackCopyContent.trim();
  return {
    simplifiedActive: enableSimplifiedProcessing && resolvedCopy.length > 0,
    resolvedCopy
  };
}
