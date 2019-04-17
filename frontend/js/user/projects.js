function Project(title, startDate, dueDate, expectedTimeHours, expectedTimeMinutes, description) {
    this.title = title;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.expectedTimeHours = expectedTimeHours;
    this.expectedTimeMinutes = expectedTimeMinutes;
    this.description = description;
    this.id = fastHash(this.title + this.startDate + this.description + this.dueDate);
}