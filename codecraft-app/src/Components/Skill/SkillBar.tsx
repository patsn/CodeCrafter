import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Skill } from "../../Interfaces/user";
import { useContextData } from "../Context/Provider";
import Image from "react-bootstrap/Image";
// @ts-ignore
import logo from "./add.png";

export default function SkillBar(props: { skills: Skill[] }): JSX.Element {
	const { data, setData } = useContextData();

	const neededExp = (exp: number, level: number): number => {
		//TODO: make this function more efficient
		switch (level) {
			case 1:
				return 5 - exp;
			case 2:
				return 11 - exp;
			case 3:
				return 18 - exp;
			case 4:
				return 26 - exp;
			case 5:
				return 34 - exp;
			case 6:
				return 44 - exp;
			case 7:
				return 54 - exp;
			case 8:
				return 64 - exp;
			case 9:
				return 79 - exp;
			case 10:
				return 94 - exp;
			case 11:
				return 109 - exp;
			case 12:
				return 127 - exp;
			case 13:
				return 145 - exp;
			case 14:
				return 165 - exp;
			case 15:
				return 185 - exp;
			case 16:
				return 205 - exp;
			case 17:
				return 225 - exp;
			case 18:
				return 250 - exp;
			case 19:
				return 275 - exp;
			case 20:
				return 300 - exp;
			case 21:
				return 330 - exp;
			case 22:
				return 365 - exp;
			case 23:
				return 405 - exp;
			case 24:
				return 450 - exp;
			case 25:
				return 500 - exp;
			default:
				return 0;
		}
	};

	const normalizeToPercent = (exp: number, level: number): number => {
		//TODO: make this function more efficient
		switch (level) {
			case 1:
				return (exp / 5) * 100;
			case 2:
				return ((exp - 5) / (11 - 5)) * 100;
			case 3:
				return ((exp - 11) / (18 - 11)) * 100;
			case 4:
				return ((exp - 18) / (26 - 18)) * 100;
			case 5:
				return ((exp - 26) / (34 - 26)) * 100;
			case 6:
				return ((exp - 34) / (44 - 34)) * 100;
			case 7:
				return ((exp - 44) / (54 - 44)) * 100;
			case 8:
				return ((exp - 54) / (64 - 54)) * 100;
			case 9:
				return ((exp - 64) / (79 - 64)) * 100;
			case 10:
				return ((exp - 79) / (94 - 79)) * 100;
			case 11:
				return ((exp - 94) / (109 - 94)) * 100;
			case 12:
				return ((exp - 109) / (127 - 109)) * 100;
			case 13:
				return ((exp - 127) / (145 - 127)) * 100;
			case 14:
				return ((exp - 145) / (165 - 145)) * 100;
			case 15:
				return ((exp - 165) / (185 - 165)) * 100;
			case 16:
				return ((exp - 185) / (205 - 185)) * 100;
			case 17:
				return ((exp - 205) / (225 - 205)) * 100;
			case 18:
				return ((exp - 225) / (250 - 225)) * 100;
			case 19:
				return ((exp - 250) / (275 - 250)) * 100;
			case 20:
				return ((exp - 275) / (300 - 275)) * 100;
			case 21:
				return ((exp - 300) / (330 - 300)) * 100;
			case 22:
				return ((exp - 330) / (365 - 330)) * 100;
			case 23:
				return ((exp - 365) / (405 - 365)) * 100;
			case 24:
				return ((exp - 405) / (450 - 405)) * 100;
			case 25:
				return ((exp - 450) / (500 - 450)) * 100;
			default:
				return 0;
		}
	};

	const checkLevelUp = (exp: number, level: number): boolean => {
		//TODO: make this function more efficient
		switch (level) {
			case 1:
				return exp >= 5;
			case 2:
				return exp >= 11;
			case 3:
				return exp >= 18;
			case 4:
				return exp >= 26;
			case 5:
				return exp >= 34;
			case 6:
				return exp >= 44;
			case 7:
				return exp >= 54;
			case 8:
				return exp >= 64;
			case 9:
				return exp >= 79;
			case 10:
				return exp >= 94;
			case 11:
				return exp >= 109;
			case 12:
				return exp >= 127;
			case 13:
				return exp >= 145;
			case 14:
				return exp >= 165;
			case 15:
				return exp >= 185;
			case 16:
				return exp >= 205;
			case 17:
				return exp >= 225;
			case 18:
				return exp >= 250;
			case 19:
				return exp >= 275;
			case 20:
				return exp >= 300;
			case 21:
				return exp >= 330;
			case 22:
				return exp >= 365;
			case 23:
				return exp >= 405;
			case 24:
				return exp >= 450;
			case 25:
				return exp >= 500;
			default:
				return false;
		}
	};

	return (
		<>
			<h4 className="white text-center m-3 ">Dein Fortschritt</h4>
			<div className="d-flex flex-wrap gap-3 justify-content-center">
				{props.skills.map((skill, index) =>
					!skill.mastered ? (
						<Card style={{ width: "18rem" }} key={index} className="customcardBad">
							<Card.Header className="d-flex justify-content-between align-items-center" style={{ height: "4rem" }}>
								{skill.name}
								{!checkLevelUp(skill.stats.exp_points, skill.stats.level) ? (
									<Button
										onClick={() => {
											setData({
												...data,
												skills: data.skills.map((addExpToSkill) => {
													if (addExpToSkill.name === skill.name) {
														return {
															...addExpToSkill,
															stats: {
																...addExpToSkill.stats,
																exp_points: addExpToSkill.stats.exp_points + 1,
															},
														};
													} else {
														return addExpToSkill;
													}
												}),
											});
										}}>
										Add Exp
									</Button>
								) : (
									<Button disabled>Add Exp</Button>
								)}
							</Card.Header>
							<Card.Body>
								<Card.Subtitle className="mb-2 text-muted">Level: {skill.stats.level}🧙</Card.Subtitle>
								<Card.Subtitle className="text-muted">Glows needed: {neededExp(skill.stats.exp_points, skill.stats.level)}☄️</Card.Subtitle>
							</Card.Body>
							<Card.Footer className="text-muted text-center" style={{ height: "3.5rem" }}>
								{checkLevelUp(skill.stats.exp_points, skill.stats.level) ? (
									<Button
										variant="warning"
										onClick={() => {
											setData({
												...data,
												skills: data.skills.map((skillToLevel) => {
													if (skillToLevel.name === skill.name && skillToLevel.stats.level < 25) {
														return {
															...skillToLevel,
															stats: {
																...skillToLevel.stats,
																level: skillToLevel.stats.level + 1,
															},
														};
													} else if (skillToLevel.name === skill.name && skillToLevel.stats.level === 25) {
														return {
															...skillToLevel,
															mastered: true,
														};
													} else {
														return skillToLevel;
													}
												}),
											});
										}}>
										Level up!
									</Button>
								) : (
									<>
										{Math.floor(normalizeToPercent(skill.stats.exp_points, skill.stats.level)).toString() + "%"}
										<ProgressBar variant="customDark" now={normalizeToPercent(skill.stats.exp_points, skill.stats.level)} />
									</>
								)}
							</Card.Footer>
						</Card>
					) : (
						<Card style={{ width: "18rem" }} key={index} className="customcardGood">
							<Card.Header className="d-flex justify-content-between align-items-center" style={{ height: "4rem" }}>
								{skill.name}
							</Card.Header>
							<Card.Body>
								<Card.Subtitle className="mb-2 text-muted">Level: 25🧙</Card.Subtitle>
								<Card.Subtitle className="text-muted">You worked 500 Hours with {skill.name} !</Card.Subtitle>
							</Card.Body>
							<Card.Footer className="text-muted text-center align-items-center d-flex" style={{ height: "3.5rem" }}>
								<Card.Subtitle>Skill Mastered!</Card.Subtitle>
							</Card.Footer>
						</Card>
					)
				)}
			</div>
			<Image src={logo} className="addImage" style={{ position: "absolute", bottom: 15, right: 15 }} width={80} />
		</>
	);
}
