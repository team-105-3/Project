function Event(title, startTime, endTime, recurring, startDate, endDate, description, recurrency, timeframe) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.recurring = recurring;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.recurrency = recurrency;
    this.timeframe = timeframe;
}

Event.prototype.display = function(parent) {
    var container = document.createElement("div");
    container.className = "event";
    var p = document.createTextNode(this.title);
    container.appendChild(p);
    document.body.appendChild(container);
}