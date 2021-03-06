import React, { useState, useEffect } from 'react';
import { nhlTeamsRecentYearChampionList } from "./data/nhl-teams-recent-year-champion";
import { nhlTeamsYearFoundedList } from "./data/nhl-teams-year-founded";

import "./main.css";

export interface Team {
    nhlTeamName: string;
    year: string;
}

function App() {
    let [filteredList, setFilteredList] = useState <Array<Team>>([]);

    useEffect(() => {
        onLoad();
    }, [setFilteredList])

    function onLoad(): void {
        let processedRecentChampions: Array<Team> = transformTextToColumns(nhlTeamsRecentYearChampionList);
        let processedTeamsYearFounded: Array<Team> = transformTextToColumns(nhlTeamsYearFoundedList);

        let teamsWithoutChampionshipWin = processedRecentChampions.filter(team => team.year === "");

        let teamsFoundedBefore1990 = processedTeamsYearFounded.filter(team => parseInt(team.year) < 1990);

        let teamsWithoutStartingVowels = teamsFoundedBefore1990.filter(excludeStartingVowels);

        let finalList: Array<Team> = [];
        teamsWithoutChampionshipWin.forEach(noWinTeam => {
            teamsWithoutStartingVowels.forEach(noVowelTeam => {
                if (noVowelTeam.nhlTeamName === noWinTeam.nhlTeamName) {
                    finalList.push(noVowelTeam);
                }
            })
        });

        let finalSortedList: Array<Team> = finalList.sort((a, b) => {
            let teamA = a.nhlTeamName.toUpperCase();
            let teamB = b.nhlTeamName.toUpperCase();
            return (teamA < teamB) ? -1 : (teamA > teamB) ? 1 : 0;
        });

        setFilteredList(finalSortedList);
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>NHL Teams for Purchase</h1>
            <span id="container" className="container" style={{ fontSize: "16px" }}>
                {filteredList.map((team, index) => {
                    return (
                        <div key={index} className="team-card">
                            {team.nhlTeamName}
                        </div>
                    )
                },)}
            </span>
        </div>
    );
}

export function transformTextToColumns(stringData: string): Array<Team> {
    let nhlTeamArray: Array<Team> = [];
    let lines: string[] = stringData.split(/\r\n|\n/);

    lines.forEach((line) => {
        let values: string[] = line.split(',');
        let nhlTeamNameAndYear: Team = { nhlTeamName: values[0], year: values[1]};
        nhlTeamArray.push(nhlTeamNameAndYear)
    });
    return nhlTeamArray;
}

export function excludeStartingVowels(team: Team): boolean {
    return !/^[aeiou]/i.test(team.nhlTeamName.toLowerCase())
}

export default App;
