
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const championGrid = document.querySelector('.champion-grid');

fetch('data/champions.json')
    .then(response => response.json())
    .then(data => {
        const championsData = Object.values(data.data); // 챔피언 객체를 배열로 변환
        const ddragonVersion = data.version; // Data Dragon 버전 가져오기
        const championImageBaseUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/`;

        championsData.forEach(champion => {
            const championCard = document.createElement('div');
            championCard.classList.add('champion-card');
            championCard.innerHTML = `
                <img src="${championImageBaseUrl}${champion.image.full}" alt="${champion.name}">
                <h3>${champion.name}</h3>
                <p>${Array.isArray(champion.tags) ? champion.tags.join(', ') : ''}</p>
                <div class="champion-tooltip">
                    <h4>${champion.name}</h4>
                    <p>${champion.blurb}</p>
                    <p class="stats">
                        <span>공격: ${champion.info.attack}</span>
                        <span>방어: ${champion.info.defense}</span>
                        <span>마법: ${champion.info.magic}</span>
                        <span>난이도: ${champion.info.difficulty}</span>
                    </p>
                </div>
            `;
            championGrid.appendChild(championCard);
        });
    })
    .catch(error => console.error('챔피언 데이터를 불러오는 데 실패했습니다:', error));

const gameModes = [
    { name: '소환사의 협곡', description: '5v5 클래식 MOBA' },
    { name: '칼바람 나락', description: '5v5 무작위 총력전' },
    { name: '돌격! 넥서스', description: '실험적인 게임 모드' }
];

const news = [
    { title: '2025 LCK 정규시즌 로스터 공개', date: '2025-07-16', url: 'https://www.leagueoflegends.com/ko-kr/news/' },
    { title: '2025 미드시즌 인비테이셔널 (MSI) 안내서 발표', date: '2025-06-17', url: 'https://www.leagueoflegends.com/ko-kr/news/' },
    { title: 'LoL e스포츠 명예의 전당 Uzi 선수 헌액', date: '2025-07-10', url: 'https://www.leagueoflegends.com/ko-kr/news/' },
    { title: '25.14 패치 신규 챔피언: 유나라 추가', date: '2025-07-05', url: 'https://www.leagueoflegends.com/ko-kr/news/' }
];

const gameModeGrid = document.querySelector('.game-mode-grid');
gameModes.forEach(mode => {
    const gameModeCard = document.createElement('div');
    gameModeCard.classList.add('game-mode-card');
    gameModeCard.innerHTML = `
        <h3>${mode.name}</h3>
        <p>${mode.description}</p>
    `;
    gameModeGrid.appendChild(gameModeCard);
});

const newsList = document.querySelector('.news-list');
news.forEach(item => {
    const newsItem = document.createElement('a'); // a 태그로 변경
    newsItem.classList.add('news-item');
    newsItem.href = item.url; // 링크 추가
    newsItem.target = "_blank"; // 새 탭에서 열기
    newsItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.date}</p>
    `;
    newsList.appendChild(newsItem);
});

const playerInfoContent = document.querySelector('.player-info-content');
const playerData = {
  "summoner_name": "CHESSPLAYER1#0526",
  "tier": {
    "solo": "Unranked",
    "flex": "Emerald 3"
  },
  "main_champions": [
    { "name": "아칼리", "id": "Akali" },
    { "name": "요네", "id": "Yone" },
    { "name": "아리", "id": "Ahri" },
    { "name": "르블랑", "id": "Leblanc" }
  ],
  "win_loss": {
    "flex": {
      "wins": 100,
      "losses": 100,
      "win_rate": 50
    }
  },
  "tier_emblem_url": "https://opgg-static.akamaized.net/images/medals_mini/emerald.png"
};

const championImageBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/";

const playerInfoHTML = `
    <div class="player-info-card-enhanced">
        <div class="player-info-left">
            <img src="${playerData.tier_emblem_url}" alt="Emerald Emblem" class="tier-emblem">
            <h3>${playerData.summoner_name}</h3>
            <p><strong>솔로 랭크:</strong> ${playerData.tier.solo}</p>
            <p><strong>자유 랭크:</strong> ${playerData.tier.flex}</p>
        </div>
        <div class="player-info-right">
            <div class="win-rate-section">
                <h4>자유 랭크 승률</h4>
                <div class="win-rate-bar">
                    <div class="win-rate-fill" style="width: ${playerData.win_loss.flex.win_rate}%;"></div>
                    <span class="win-rate-text">${playerData.win_loss.flex.win_rate}%</span>
                </div>
                <p>${playerData.win_loss.flex.wins}승 ${playerData.win_loss.flex.losses}패</p>
            </div>
            <div class="main-champions-section">
                <h4>주 챔피언</h4>
                <div class="main-champions-list">
                    ${playerData.main_champions.map(champion => `
                        <div class="champion-portrait">
                            <img src="${championImageBaseUrl}${champion.id}.png" alt="${champion.name}">
                            <span>${champion.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
`;
playerInfoContent.innerHTML = playerInfoHTML;
