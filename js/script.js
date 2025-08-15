function calculateTotal() {
    const checkboxes = document.querySelectorAll('.price:checked');
    let sum = 0; // 単位：万円

    checkboxes.forEach(cb => {
        sum += parseInt(cb.value);
    });

    const multiplied = sum * 10000; // 単位：円

    // 💰 合計金額表示（億対応）
    const totalElement = document.getElementById('total');
    if (sum >= 10000) {
        const oku = Math.floor(sum / 10000); // 億
        const man = sum % 10000;             // 万円
        if (man === 0) {
            totalElement.textContent = `${oku.toLocaleString('ja-JP')}億`;
        } else {
            totalElement.textContent = `${oku.toLocaleString('ja-JP')}億${man.toLocaleString('ja-JP')}万円`;
        }
    } else {
        totalElement.textContent = `${sum.toLocaleString('ja-JP')}万円`;
    }

    // 📝 請求金額（円）
    document.getElementById('multiplied').textContent = `${multiplied.toLocaleString('ja-JP')} 円`;

    // 📉 割る数で計算（切り捨て）
    const divider = parseInt(document.getElementById('divider')?.value) || 1;
    const dividedMan = Math.floor(sum / divider);          // 万円単位
    const dividedYen = Math.floor(multiplied / divider);   // 円単位

    // 割った結果の表示
    if (document.getElementById('divided-man')) {
        document.getElementById('divided-man').textContent = `${dividedMan.toLocaleString('ja-JP')}万円`;
    }
    if (document.getElementById('divided-yen')) {
        document.getElementById('divided-yen').textContent = `${dividedYen.toLocaleString('ja-JP')} 円`;
    }
}

// チェックボックスと割る数入力の両方で計算を発火
document.querySelectorAll('.price').forEach(cb => {
    cb.addEventListener('change', calculateTotal);
});
document.getElementById('divider')?.addEventListener('input', calculateTotal);