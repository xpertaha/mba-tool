document.getElementById('strategy-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const productDesc = document.getElementById('product-desc').value;
    const targetAudience = document.getElementById('target-audience').value;
    const mainMessage = document.getElementById('main-message').value;
    
    if (!productDesc || !targetAudience || !mainMessage) {
        alert('المرجو ملء جميع الخانات.');
        return;
    }

    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');

    resultsContainer.innerHTML = '';
    loader.classList.remove('hidden');

    try {
        // This is where we will call our Netlify function later.
        // For now, it's a placeholder.
        const response = await fetch('/.netlify/functions/generate-strategy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productDesc, targetAudience, mainMessage }),
        });

        if (!response.ok) {
            throw new Error('حدث خطأ أثناء إنشاء الاستراتيجية.');
        }

        const data = await response.json();
        
        // Use the 'marked' library to convert Markdown table to HTML
        resultsContainer.innerHTML = marked.parse(data.strategy);

    } catch (error) {
        resultsContainer.innerHTML = `<p style="color: #ff6b6b;">${error.message}</p>`;
    } finally {
        loader.classList.add('hidden');
    }
});