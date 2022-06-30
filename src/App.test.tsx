// Reqs:
// Name of team must NOT START with a vowel ['A', 'e', 'I', 'o', 'u']
// Final list must be sorted alphabetically
// Teams must have been founded prior to 1990
// Teams must have never won the stanley cup
import App from './App';
import { Team } from './App'
import { transformTextToColumns, excludeStartingVowels, onLoad } from "./App";
import { nhlTeamsRecentYearChampionList } from "./data/nhl-teams-recent-year-champion";
import { nhlTeamsYearFoundedList } from "./data/nhl-teams-year-founded";


it('transforming data to columns should be truthy', () => {
   const processedRecentChampions: Array<Team> = transformTextToColumns(nhlTeamsRecentYearChampionList);
   const processedTeamsYearFounded: Array<Team> = transformTextToColumns(nhlTeamsYearFoundedList);
   expect(processedRecentChampions && processedTeamsYearFounded).toBeTruthy();
});

it('should exclude team names with starting vowels', () => {
   const teamWithVowel: Team = {
      nhlTeamName: 'Apple Orchard',
      year: '2020',
   };
   expect(excludeStartingVowels(teamWithVowel)).toBeFalsy();
});

it('should include team names without starting vowels', () => {
   const teamWithoutVowel: Team = {
      nhlTeamName: 'Trilogy Orchard',
      year: '2020',
   };
   expect(excludeStartingVowels(teamWithoutVowel)).toBeTruthy();
});
