window.onload = initialize();

var json;
var startIndex = 0;
var endIndex = 10;
var haveData = true;
var card = `
<div class="card">
    <div class="upper">
        <img src="assets/$image" alt="College">
        <div class="promoted" style="display: $promoted">Promoted</div>
        <div class="rating">
            <span>$rating</span><span>/5</span><span>$rating_remarks</span>
        </div>
        <div class="tag-wrapper">
            <div class="tag">$tags1</div>
            <div class="tag">$tags2</div>
        </div>
        <span class="ranking">$ranking</span>
    </div>
    <div class="lower">
        <div>
            <h2 class="college-name">$college_name</h2>
            <div class="star-wrapper">
                <span class="star"></span>
                <span class="star"></span>
                <span class="star"></span>
                <span class="star"></span>
                <span class="star"></span>
            </div>
            <div class="discount">$discount</div>
            <del class="original-fees">$original_fees</del>
        </div>
        <div>
            <span class="nearest-place">$nearest_place1</span>
            <span class="nearest-place">$nearest_place2</span>
            <span class="discounted-fees">$discounted_fees</span>
        </div>
        <div>
            <span class="match">93% Match :</span>
            <span class="famous-places">$famous_nearest_places</span>
            <span class="fees-cycle">$fees_cycle</span>
        </div>
        <div class="offer">
            <span class="offer-text">$offertext</span>
        </div>
        <span class="amenities">$amenties1</span>
        <span class="amenities">$amenties2</span>
    </div>
</div>`;

function initialize() {
    loadJSON(function (response) {
        json = JSON.parse(response);
        createCards(startIndex, endIndex);
    });
}

function createCards(start, count) {
    var container = document.getElementsByClassName('container')[0];
    var collegeList = json.colleges.slice(start, count);
    if (collegeList?.length > 0) {
        collegeList.forEach(data => {
            var newCard = card.replace('$college_name', data.college_name)
                .replace('$promoted', data.promoted ? 'inline-block' : 'none')
                .replace('$discount', data.discount)
                .replace('$original_fees', data.original_fees)
                .replace('$discounted_fees', data.discounted_fees)
                .replace('$fees_cycle', data.fees_cycle)
                .replace('$image', data.image)
                .replace('$ranking', data.ranking)
                .replace('$tags1', data.tags[0])
                .replace('$tags2', data.tags[1])
                .replace('$amenties1', data.amenties[0])
                .replace('$amenties2', data.amenties[1])
                .replace('$rating', data.rating)
                .replace('$rating_remarks', data.rating_remarks)
                .replace('$famous_nearest_places', data.famous_nearest_places)
                .replace('$nearest_place1', data.nearest_place[0])
                .replace('$nearest_place2', data.nearest_place[1])
                .replace('$offertext', data.offertext);
            container.innerHTML += newCard;
        });
    }
    else {
        haveData = false;
    }
}

function loadJSON(callback) {
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', 'assets/colleges.json', true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == "200") {
            callback(req.responseText);
        }
    };
    req.send(null);
}

window.onscroll = function () {
    if (haveData && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
        startIndex += 10;
        endIndex += 10;
        createCards(startIndex, endIndex)
    }
};