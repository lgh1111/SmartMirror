const weather = {
  apiKey: "21ab6045841f3379713b348b0f721fd8&units=metric&lang=kr",
  fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then(data => this.displayWeather(data))
      .catch(error => {
        alert(error.message);
      });
  },
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    
    // Select the appropriate clothing image based on the temperature
    const clothingImgs = document.querySelectorAll(".clothing-img, .clothing-img-2");
    let [clothingImg1, clothingImg2] = ["coat.jpg", "winter.jpg"];
    if (temp >= 25) {
      [clothingImg1, clothingImg2] = ["tshirt.jpg", "summer.jpg"];
    } else if (temp >= 20) {
      [clothingImg1, clothingImg2] = ["mmm.jpg", "training.jpg"];
    } else if (temp >= 10) {
      [clothingImg1, clothingImg2] = ["long.jpg", "bluejin.jpg"];
    }
    clothingImgs[0].src = clothingImg1;
    clothingImgs[1].src = clothingImg2;

    // Update the webpage with the weather data and clothing image
    document.querySelector(".city").innerText = `${name} 날씨`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp}°C`;
    document.querySelector(".humidity").innerText = `습도: ${humidity}%`; // change humidity to Korean
    document.querySelector(".wind").innerText = `풍속: ${speed} km/h`; // change wind to Korean
    document.querySelector(".weather").classList.remove("loading");
   // document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
};
weather.fetchWeather("Busan");

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const clockHtml = `<span class="clock-hours">${hours}</span>
    <span class="clock-separator">:</span>
    <span class="clock-minutes">${minutes}</span>
    <span class="clock-separator">:</span>
    <span class="clock-seconds">${seconds}</span>`;

  const clockElement = document.getElementById("clock");
  clockElement.innerHTML = clockHtml;
}

setInterval(updateClock, 1000);

function createCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendar = document.getElementById('calendar');
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 헤더 생성
  for (let i = 0; i < weekDays.length; i++) {
    const th = document.createElement('th');
    th.textContent = weekDays[i];
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // 달력 날짜 생성
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        // 이번 달 이전의 날짜
        const prevMonthDays = new Date(year, month, 0).getDate();
        cell.textContent = prevMonthDays - firstDay + j + 1;
        cell.classList.add('prev-month');
      } else if (day > daysInMonth) {
        // 이번 달 이후의 날짜
        cell.textContent = day - daysInMonth;
        cell.classList.add('next-month');
        day++; 
      } else {
        // 이번 달 날짜
        cell.textContent = day;
        day++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
    if (day > daysInMonth) {
      break;
    }
  }

  // 스타일 설정
  const todayStr = today.toDateString();
  const cells = table.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === today.getDate().toString() &&
        year === today.getFullYear() &&
        month === today.getMonth()) {
      cells[i].classList.add('today');
    }
    if (i % 7 === 0) {
      cells[i].classList.add('sunday');
    } else if (i % 7 === 6) {
      cells[i].classList.add('saturday');
    }
  }

  // 캘린더 업데이트
  calendar.innerHTML = "";
  calendar.appendChild(table);
}

createCalendar();

function updateClock() {

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var day = now.getDate();
if(month < 10){
  month = '0' + month;
}
if(day < 10){
  day = '0' + day;
}

var dateStr = year + "-" + month + "-" + day;

var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
if(hours < 10){
  hours = '0' + hours;
}
if(minutes < 10){
  minutes = '0' + minutes;
}
if(seconds < 10){
  seconds = '0' + seconds;
}
var timeStr = hours + ":" + minutes + ":" + seconds;
var clockStr = dateStr + " " + timeStr;

document.getElementById("clock").innerHTML = clockStr;
}
      
setInterval(updateClock, 1000);

const apiKey = 'p7LQEOd2uAxLUdnh4%2F8cRd8%2F2%2Fm5L6Pd%2FIoi5%2FBzeF%2FF9rp5YhhSbka648X6%2FEDphUaxz5uwO5IylU8kiOCI7w%3D%3D';
const busStopId = '182250401';
const apiUrl = `http://apis.data.go.kr/6260000/BusanBIMS/stopArrByBstopid?bstopid=182250401&serviceKey=p7LQEOd2uAxLUdnh4%2F8cRd8%2F2%2Fm5L6Pd%2FIoi5%2FBzeF%2FF9rp5YhhSbka648X6%2FEDphUaxz5uwO5IylU8kiOCI7w%3D%3D`;
const busArrivalsList = document.getElementById('busArrivals');

newFetch();

setInterval(function() {
newFetch();
}, 1000);

function newFetch(){
fetch(apiUrl)
.then(response => response.text())
.then(data => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data,"text/xml");
  const items = xmlDoc.getElementsByTagName('item');

  const newBusArrivalList = document.createElement('ul');

  for (let i = 0; i < items.length && i < 3; i++) {
      const item = items[i];
      const lineno = item.getElementsByTagName('lineno')[0].childNodes[0].nodeValue;
      const min1 = item.getElementsByTagName('min1')[0].childNodes[0].nodeValue;
    
      const busArrivalItem = document.createElement('li');
      busArrivalItem.innerText = `${lineno}번 버스 도착 ${min1}분 전`;
    
      newBusArrivalList.appendChild(busArrivalItem);
  }

  busArrivalsList.innerHTML = newBusArrivalList.innerHTML;
})
.catch(error => console.error(error));
}

const sidoName = encodeURIComponent('부산');
const pageNo = 27;
const numOfRows = 1;
const returnType = 'xml';
const serviceKey = encodeURIComponent('p7LQEOd2uAxLUdnh4/8cRd8/2/m5L6Pd/Ioi5/BzeF/F9rp5YhhSbka648X6/EDphUaxz5uwO5IylU8kiOCI7w==');
const ver = '1.0';
const microgram = "µg/m³";
const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=${returnType}&serviceKey=${serviceKey}&ver=${ver}`;

axios.get(url)
  .then(response => {
    const xmlData = response.data;
    // XML 데이터 파싱 작업을 수행하여 결과를 표시
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');

    const dataContainer = document.getElementById('data-container');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const stationName = item.getElementsByTagName('stationName')[0].textContent;
      const pm10Value = Number(item.getElementsByTagName('pm10Value')[0].textContent);

      const itemElement = document.createElement('div');
      itemElement.classList.add('item');

      const stationNameElement = document.createElement('span');
      stationNameElement.classList.add('station-name');
      stationNameElement.textContent = stationName;

      const statusElement = document.createElement('span');
      statusElement.classList.add('status');
      statusElement.textContent = getDustStatus(pm10Value);
      statusElement.classList.add(getDustStatusClass(pm10Value));

      const valueElement = document.createElement('span');
      valueElement.classList.add('value');
      valueElement.textContent = pm10Value + " " + microgram; // 마이크로그램 단위 추가

      itemElement.appendChild(stationNameElement);
      itemElement.appendChild(statusElement);
      itemElement.appendChild(valueElement);

      dataContainer.appendChild(itemElement);
    }
  })
  .catch(error => {
    console.log(error);
  });


function getDustStatus(value) {
  if (value <= 30) {
    return ' 매우 좋음 ';
  } else if (value <= 50) {
    return ' 좋음 ';
  } else if (value <= 100) {
    return ' 나쁨 ';
  } else {
    return ' 매우 나쁨 ';
  }
}

function getDustStatusClass(value) {
  if (value <= 30) {
    return 'status-very-good';
  } else if (value <= 50) {
    return 'status-good';
  } else if (value <= 100) {
    return 'status-bad';
  } else {
    return 'status-very-bad';
  }
}
