export const checkSession = async () => {
    const response = await fetch("http://localhost:8888/final-project/backend/check-session.php", {
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! message: ${response.message}`);
    }

    return await response.json();
}