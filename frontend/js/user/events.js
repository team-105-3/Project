function Event(title, startTime, endTime, recurring, startDate, endDate, description, recurrency, timeframe, color) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.recurring = recurring;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.recurrency = recurrency;
    this.timeframe = timeframe;
    this.color = color;
    this.id = fastHash(this.title + this.startDate + this.startTime + this.description);
}