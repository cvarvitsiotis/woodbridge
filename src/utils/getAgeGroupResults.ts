import { IndividualResultType } from "@/types";

interface AgeGroupInfo {
  ageGroupsWithLabels: Map<string, string>;
  ageToAgeGroups: Map<string, string>;
}

export default function getAgeGroupResults(
  individualResults: IndividualResultType[],
  ageGroups: string,
): Array<IndividualResultType & { rank: number; ageGroup: string }> {
  if (!individualResults || individualResults.length === 0 || !ageGroups) return [];

  const ageGroupInfo = getAgeGroupInfo(ageGroups);

  const groupedIndividualResults = groupIndividualResults(individualResults, ageGroupInfo);

  return getAgeGroupResultsInternal(groupedIndividualResults);
}

function getAgeGroupInfo(ageGroupsStr: string): AgeGroupInfo {
  const ageGroups = ageGroupsStr
    .split(/[\s,]+/)
    .map((ageGroup) => ageGroup.trim())
    .filter((ageGroup) => ageGroup.length > 0);

  ageGroups.sort((a, b) => Number(a) - Number(b));

  const ageToAgeGroups = new Map<string, string>();
  const ageGroupsWithLabels = new Map<string, string>();
  let previousMaxAge = -1;

  for (let groupIndex = 0; groupIndex < ageGroups.length; groupIndex += 1) {
    const maxAge = ageGroups[groupIndex];
    const maxAgeNum = Number(maxAge);
    const minAge = previousMaxAge + 1;
    const ageGroupLabel = `${minAge} - ${maxAgeNum}`;

    for (let age = minAge; age <= maxAgeNum; age += 1) {
      ageToAgeGroups.set(String(age), maxAge);
    }

    ageGroupsWithLabels.set(maxAge, ageGroupLabel);
    previousMaxAge = maxAgeNum;
  }

  ageGroupsWithLabels.set("?", "Unknown");

  return { ageGroupsWithLabels, ageToAgeGroups };
}

function normalizeGender(gender?: string | null): string {
  const normalizedGender = (gender ?? "?").trim().toUpperCase();

  if (normalizedGender === "M") return "M";
  if (normalizedGender === "F") return "F";

  return "?";
}

function groupIndividualResults(
  individualResults: IndividualResultType[],
  ageGroupInfo: AgeGroupInfo,
): Map<string, { label: string; results: Map<string, IndividualResultType[]> }> {
  if (!ageGroupInfo || ageGroupInfo.ageToAgeGroups.size === 0)
    return new Map<string, { label: string; results: Map<string, IndividualResultType[]> }>();

  const ageGroupResults = new Map<
    string,
    { label: string; results: Map<string, IndividualResultType[]> }
  >();

  ageGroupInfo.ageGroupsWithLabels.forEach((label, maxAge) => {
    ageGroupResults.set(maxAge, {
      label,
      results: new Map<string, IndividualResultType[]>([
        ["F", []],
        ["M", []],
        ["?", []],
      ]),
    });
  });

  individualResults.forEach((individualResult) => {
    const groupMaxAge = ageGroupInfo.ageToAgeGroups.get(individualResult.age) ?? "?";

    const gender = normalizeGender(individualResult.gender);
    const existingEntry = ageGroupResults.get(groupMaxAge)!;
    const resultsForGender = existingEntry.results.get(gender) ?? [];

    resultsForGender.push(individualResult);
    existingEntry.results.set(gender, resultsForGender);
  });

  return ageGroupResults;
}

function getAgeGroupResultsInternal(
  groupedIndividualResults: Map<
    string,
    { label: string; results: Map<string, IndividualResultType[]> }
  >,
): Array<IndividualResultType & { rank: number; ageGroup: string }> {
  const ageGroupResults: Array<IndividualResultType & { rank: number; ageGroup: string }> = [];

  groupedIndividualResults.forEach((groupValue) => {
    groupValue.results.forEach((results) => {
      for (let index = 0; index < Math.min(3, results.length); index += 1) {
        ageGroupResults.push({ ...results[index], rank: index + 1, ageGroup: groupValue.label });
      }
    });
  });

  return ageGroupResults;
}
