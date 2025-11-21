import { detectBrowser } from './platform';

// 读取剪切板内容
export async function readClipboard(): Promise<string> {
    const browser = detectBrowser();

    // Safari 使用 native messaging 读剪切板
    if (browser === 'safari') {
        try {
            return await readClipboardViaNativeMessaging();
        } catch (error) {
            console.error('Safari native messaging 读取剪切板失败:', error);
            // 回退到标准 API
        }
    }

    try {
        // 使用标准 Clipboard API
        if (navigator.clipboard && navigator.clipboard.readText) {
            const text = await navigator.clipboard.readText();
            return text || '';
        }

        throw new Error('浏览器不支持剪切板API');
    } catch (error) {
        console.error('读取剪切板失败:', error);

        // 如果是权限问题，提供更友好的错误信息
        if (error instanceof Error && error.name === 'NotAllowedError') {
            throw new Error('剪切板权限被拒绝，请允许扩展访问剪切板');
        }

        throw new Error('无法读取剪切板内容，请检查权限设置');
    }
}

// Safari 通过 native messaging 读取剪切板
async function readClipboardViaNativeMessaging(): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            // 在 Safari 中，通过 background script 与 native app 通信
            browser.runtime.sendMessage({
                action: 'readClipboardFromNative'
            }, (response) => {
                if (browser.runtime.lastError) {
                    console.error('与 background script 通信失败:', browser.runtime.lastError);
                    reject(new Error('与 background script 通信失败'));
                    return;
                }

                if (response && response.success && response.type === 'text') {
                    resolve(response.data || '');
                } else {
                    const errorMsg = response?.data || '剪切板为空或包含不支持的内容';
                    reject(new Error(errorMsg));
                }
            });
        } catch (error) {
            console.error('发送消息到 background script 失败:', error);
            reject(new Error('无法与 background script 通信'));
        }
    });
} 