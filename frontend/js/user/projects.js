function Project(title, startDate, dueDate, expectedTimeHours, expectedTimeMinutes, description, timeRemaining, color) {
    this.title = title;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.expectedTimeHours = expectedTimeHours;
    this.expectedTimeMinutes = expectedTimeMinutes;
    this.description = description;
    this.timeRemaining = timeRemaining;
    this.color = color;
    this.id = fastHash(this.title + this.startDate + this.description + this.dueDate);
}