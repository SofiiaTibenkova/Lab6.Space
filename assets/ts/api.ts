import type { LaunchResponse } from './types'; 

export async function fetchLaunchData(provider: string): Promise<LaunchResponse> {
    let url = 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1';
    
    if (provider) {
        url += `&lsp__name=${provider}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP Помилка: ${response.status}`);
    }

    return response.json();
}