const skillContainer = document.getElementById('skillContainer');

function addSkill(initialData = { name: '', timing: '', target: '', range: '', effect: '', note: '' }) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';
    skillDiv.innerHTML = `
        <button type="button" class="btn remove-btn" onclick="this.parentElement.remove()">削除</button>
        <div class="skill-item-main">
            <div class="form-group">
                <label>スキル名</label>
                <input type="text" class="s-name" value="${initialData.name}">
            </div>
            <div class="form-group">
                <label>使用タイミング</label>
                <select class="s-timing">
                    <option value="ムーブ" ${initialData.timing === 'ムーブ' ? 'selected' : ''}>ムーブ</option>
                    <option value="マイナー" ${initialData.timing === 'マイナー' ? 'selected' : ''}>マイナー</option>
                    <option value="メジャー" ${initialData.timing === 'メジャー' ? 'selected' : ''}>メジャー</option>
                    <option value="インスタンス" ${initialData.timing === 'インスタンス' ? 'selected' : ''}>インスタンス</option>
                    <option value="どれか" ${initialData.timing === 'どれか' ? 'selected' : ''}>どれか（お任せ）</option>
                </select>
            </div>
            <div class="form-group">
                <label>対象</label>
                <select class="s-target">
                    <option value="自身" ${initialData.target === '自身' ? 'selected' : ''}>自身</option>
                    <option value="味方全員" ${initialData.target === '味方全員' ? 'selected' : ''}>味方全員</option>
                    <option value="味方一人" ${initialData.target === '味方一人' ? 'selected' : ''}>味方一人</option>
                    <option value="自身以外の味方" ${initialData.target === '自身以外の味方' ? 'selected' : ''}>自身以外の味方</option>
                    <option value="自身以外の味方1人" ${initialData.target === '自身以外の味方1人' ? 'selected' : ''}>自身以外の味方1人</option>
                    <option value="敵全体" ${initialData.target === '敵全体' ? 'selected' : ''}>敵全体</option>
                    <option value="敵単体" ${initialData.target === '敵単体' ? 'selected' : ''}>敵単体</option>
                </select>
            </div>
            <div class="form-group">
                <label>射程</label>
                <input type="number" class="s-range" value="${initialData.range}" min="0">
            </div>
        </div>
        <div class="skill-item-detail">
            <div class="form-group">
                <label>効果説明文</label>
                <textarea class="s-effect">${initialData.effect}</textarea>
            </div>
            <div class="skill-item-flavor">
                <div class="form-group">
                    <label>備考（任意）</label>
                    <input type="text" class="s-note" value="${initialData.note || ''}">
                </div>
                <div class="form-group">
                    <label>フレーバーテキスト（任意）</label>
                    <input type="text" class="s-flavor">
                </div>
            </div>
        </div>
    `;
    skillContainer.appendChild(skillDiv);
}

// 初期表示
addSkill({
    name: '通常移動',
    timing: 'ムーブ',
    target: '自身',
    range: '0',
    effect: '指定したマスまで移動する。',
    note: '移動力を参照',
});
for (let i = 0; i < 3; i++) addSkill();

function exportToTxt() {
    const charName = document.getElementById('char_name').value || "未設定";
    const role = document.getElementById('role').value || "未設定";

    let textContent = `【キャラクター性能アンケート回答】\n`;
    textContent += `----------------------------------\n`;
    textContent += `名前：${charName}\n`;
    textContent += `ロール：${role}\n`;
    textContent += `----------------------------------\n\n`;

    const skills = document.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        const sName = skill.querySelector('.s-name').value || "無題";
        const sTiming = skill.querySelector('.s-timing').value;
        const sTarget = skill.querySelector('.s-target').value;
        const sRange = skill.querySelector('.s-range').value;
        const sEffect = skill.querySelector('.s-effect').value;
        const sNote = skill.querySelector('.s-note')?.value || "";
        const sFlavor = skill.querySelector('.s-flavor').value;

        textContent += `[スキル ${index + 1}]\n`;
        textContent += `スキル名：${sName}\n`;
        textContent += `タイミング：${sTiming}\n`;
        textContent += `対象：${sTarget}\n`;
        textContent += `射程：${sRange}\n`;
        textContent += `効果：${sEffect}\n`;
        if (sNote) textContent += `備考：${sNote}\n`;
        if (sFlavor) textContent += `フレーバー：${sFlavor}\n`;
        textContent += `\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `character_sheet_${charName}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
}

