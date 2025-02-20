// مصفوفة  للصور  
let imgs = [
    'assets/1.gif', 'assets/2.gif', 'assets/3.gif', 
    'assets/4.gif', 'assets/5.gif', 'assets/6.gif'
];

//  بكرر الصور ليكون وكل صورة 2 وترتيب  عشوائي
let rArray = [...imgs, ...imgs].sort(() => Math.random() - 0.5);

//  الصوت وقت الجواب   
let rightAudio = new Audio('assets/right.wav');
let wrongAudio = new Audio('assets/wrong.wav');

 
let main = document.getElementById('main');

 function drawImgs() {
    for (let i = 0; i < rArray.length; i++) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", rArray[i]);
        img.style.opacity = "0"; // اخفي الصور كلهم ع هيئه قمر
        div.appendChild(img);
        main.appendChild(div);
    }
}

 drawImgs();

 let allDivs = document.querySelectorAll('#main div');

 let selected = [];
let canClick = true; //  للاختيار

 allDivs.forEach(div => {
    div.addEventListener('click', function() {
        if (!canClick || selected.includes(this)) return;
         // عدم اختيار نفس الصوره 2

        let img = this.firstChild;
        img.style.opacity = "1"; // إظهار الصورة ب النقر

        selected.push(this); // حفظ الصوره الي خترتها  

        if (selected.length === 2) { // بتحقق من    اختيار صورتين
            canClick = false; 
             setTimeout(checkMatch, 310); // وقت مقارنه الصور 
        }
    });
});

 function checkMatch() {
    let [first, second] = selected;

    if (first.firstChild.getAttribute('src') === second.firstChild.getAttribute('src')) {
        rightAudio.play();  
    } else {
        wrongAudio.play();  
        first.firstChild.style.opacity = "0"; // إخفاء الصورة 1
        second.firstChild.style.opacity = "0"; // إخفاء الصورة 2
    }

    selected = []; // تفريغ المصفوفة لاختيار صور جديدة
    canClick = true; // إعادة السماح بالنقر
}
