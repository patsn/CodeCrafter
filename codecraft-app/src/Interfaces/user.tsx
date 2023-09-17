export interface User {
	username: string;
	skills: Skill[];
	//TODO trackingTime
	//TODO skillListStarted
	//TODO availablePoints
}
export interface Skill {
	name: string;
	stats: Stats;
	mastered: boolean;
}

export interface Stats {
	exp_points: number;
	level: number;
}
