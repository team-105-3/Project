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
    this.id = fastHash(this.title + this.startDate + this.startTime + this.description);
}