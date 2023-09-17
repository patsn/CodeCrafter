export interface User {
	username: string;
	skills: Skill[];
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
