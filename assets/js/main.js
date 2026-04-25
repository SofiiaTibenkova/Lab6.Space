import { fetchLaunchData } from './api.js';
const btn = document.getElementById('btn');
const statusText = document.getElementById('status-text');
const providerSelect = document.getElementById('provider-select');
const launchTitle = document.getElementById('launch-title');
const launchDetails = document.getElementById('launch-details');
const imageContainer = document.getElementById('image-container');
if (btn) {
    btn.addEventListener('click', async () => {
        if (!statusText || !providerSelect || !launchTitle || !launchDetails || !imageContainer) {
            console.error("Помилка: не всі елементи DOM знайдені.");
            return;
        }
        try {
            statusText.textContent = 'Зв\'язок з орбітою...';
            btn.disabled = true;
            const provider = providerSelect.value;
            const data = await fetchLaunchData(provider);
            if (data.results && data.results.length > 0) {
                const launch = data.results[0];
                const launchDate = new Date(launch.net).toLocaleString('uk-UA');
                if (launch.image) {
                    imageContainer.innerHTML = `<img src="${launch.image}" alt="Space Rocket">`;
                }
                else {
                    imageContainer.innerHTML = `<div class="placeholder-text">Фото місії відсутнє</div>`;
                }
                launchTitle.textContent = launch.name || 'Назва місії не вказана';
                launchDetails.innerHTML = `
                    <p><strong>Статус:</strong> ${launch.status?.name || 'В очікуванні'}</p>
                    <p><strong>Дата старту:</strong> ${launchDate}</p>
                    <p><strong>Ракета:</strong> ${launch.rocket?.configuration?.name || 'Інформація оновлюється'}</p>
                    <p><strong>Оператор:</strong> ${launch.launch_service_provider?.name || 'Приватний оператор'}</p>
                `;
                statusText.textContent = 'Дані отримано успішно.';
            }
            else {
                launchTitle.textContent = 'Поки немає запланованих місій';
                launchDetails.innerHTML = '';
                imageContainer.innerHTML = `<div class="placeholder-text">Запусків не знайдено</div>`;
                statusText.textContent = 'Спробуйте вибрати іншого провайдера.';
            }
        }
        catch (err) {
            if (err instanceof Error) {
                statusText.textContent = `Помилка зв'язку: ${err.message}`;
            }
            else {
                statusText.textContent = `Сталася невідома помилка.`;
            }
            console.error(err);
        }
        finally {
            btn.disabled = false;
        }
    });
}
