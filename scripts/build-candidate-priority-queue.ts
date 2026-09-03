import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { topSchoolRosterPersonAudits } from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";
import { people as atlasPeople } from "../app/data";
import {
  candidatePriorityBatch1People2026,
  candidatePriorityBatch1Placements2026,
  candidatePriorityBatch1Relationships2026,
} from "../app/candidate-priority-batch-1-2026";
import {
  candidatePriorityP0AsiaBatch2GroupMembers2026,
  candidatePriorityP0AsiaBatch2People2026,
  candidatePriorityP0AsiaBatch2Placements2026,
  candidatePriorityP0AsiaBatch2Relationships2026,
  candidatePriorityP0AsiaBatch2RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-2-2026";
import {
  candidatePriorityP0EuropeBatch2GroupMembers2026,
  candidatePriorityP0EuropeBatch2People2026,
  candidatePriorityP0EuropeBatch2Placements2026,
  candidatePriorityP0EuropeBatch2Relationships2026,
  candidatePriorityP0EuropeBatch2RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-2-2026";
import {
  candidatePriorityP0UsCanadaBatch2GroupMembers2026,
  candidatePriorityP0UsCanadaBatch2People2026,
  candidatePriorityP0UsCanadaBatch2Placements2026,
  candidatePriorityP0UsCanadaBatch2Relationships2026,
  candidatePriorityP0UsCanadaBatch2RosterPromotions2026,
  candidatePriorityP0UsCanadaBatch2SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-batch-2-2026";
import {
  candidatePriorityP0AsiaBatch3GroupMembers2026,
  candidatePriorityP0AsiaBatch3People2026,
  candidatePriorityP0AsiaBatch3Placements2026,
  candidatePriorityP0AsiaBatch3Relationships2026,
  candidatePriorityP0AsiaBatch3RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-3-2026";
import {
  candidatePriorityP0EuropeBatch3GroupMembers2026,
  candidatePriorityP0EuropeBatch3People2026,
  candidatePriorityP0EuropeBatch3Placements2026,
  candidatePriorityP0EuropeBatch3Relationships2026,
  candidatePriorityP0EuropeBatch3RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-3-2026";
import {
  candidatePriorityP0UsCanadaBatch3GroupMembers2026,
  candidatePriorityP0UsCanadaBatch3People2026,
  candidatePriorityP0UsCanadaBatch3Placements2026,
  candidatePriorityP0UsCanadaBatch3Relationships2026,
  candidatePriorityP0UsCanadaBatch3RosterPromotions2026,
  candidatePriorityP0UsCanadaBatch3SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-batch-3-2026";
import { candidatePriorityExistingMatchPromotions2026 } from "../app/candidate-priority-existing-match-promotions-2026";
import {
  candidatePriorityP0AsiaBatch4GroupMembers2026,
  candidatePriorityP0AsiaBatch4People2026,
  candidatePriorityP0AsiaBatch4Placements2026,
  candidatePriorityP0AsiaBatch4Relationships2026,
  candidatePriorityP0AsiaBatch4RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-4-2026";
import {
  candidatePriorityP0EuropeRemainingReadyChunk1GroupMembers2026,
  candidatePriorityP0EuropeRemainingReadyChunk1People2026,
  candidatePriorityP0EuropeRemainingReadyChunk1Placements2026,
  candidatePriorityP0EuropeRemainingReadyChunk1Relationships2026,
  candidatePriorityP0EuropeRemainingReadyChunk1RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-remaining-ready-chunk-1-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch4GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch4People2026,
  candidatePriorityP0UsCanadaReadyBatch4Placements2026,
  candidatePriorityP0UsCanadaReadyBatch4Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch4RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch4SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-4-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch5GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch5People2026,
  candidatePriorityP0UsCanadaReadyBatch5Placements2026,
  candidatePriorityP0UsCanadaReadyBatch5Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch5RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch5SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-5-2026";
import {
  candidatePriorityP0AsiaBatch5GroupMembers2026,
  candidatePriorityP0AsiaBatch5People2026,
  candidatePriorityP0AsiaBatch5Placements2026,
  candidatePriorityP0AsiaBatch5Relationships2026,
  candidatePriorityP0AsiaBatch5RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-5-2026";
import {
  candidatePriorityP0EuropeBatch5GroupMembers2026,
  candidatePriorityP0EuropeBatch5People2026,
  candidatePriorityP0EuropeBatch5Placements2026,
  candidatePriorityP0EuropeBatch5Relationships2026,
  candidatePriorityP0EuropeBatch5RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-5-2026";
import {
  candidatePriorityP0AsiaBatch6GroupMembers2026,
  candidatePriorityP0AsiaBatch6People2026,
  candidatePriorityP0AsiaBatch6Placements2026,
  candidatePriorityP0AsiaBatch6Relationships2026,
  candidatePriorityP0AsiaBatch6RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-6-2026";
import {
  candidatePriorityP0AsiaBatch7DuplicateRosterPromotions2026,
  candidatePriorityP0AsiaBatch7GroupMembers2026,
  candidatePriorityP0AsiaBatch7People2026,
  candidatePriorityP0AsiaBatch7Placements2026,
  candidatePriorityP0AsiaBatch7Relationships2026,
  candidatePriorityP0AsiaBatch7RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-7-2026";
import {
  candidatePriorityP0AsiaBatch8GroupMembers2026,
  candidatePriorityP0AsiaBatch8People2026,
  candidatePriorityP0AsiaBatch8Placements2026,
  candidatePriorityP0AsiaBatch8Relationships2026,
  candidatePriorityP0AsiaBatch8RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-8-2026";
import {
  candidatePriorityP0AsiaBatch9GroupMembers2026,
  candidatePriorityP0AsiaBatch9People2026,
  candidatePriorityP0AsiaBatch9Placements2026,
  candidatePriorityP0AsiaBatch9Relationships2026,
  candidatePriorityP0AsiaBatch9RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-9-2026";
import {
  candidatePriorityP0AsiaBatch10GroupMembers2026,
  candidatePriorityP0AsiaBatch10People2026,
  candidatePriorityP0AsiaBatch10Placements2026,
  candidatePriorityP0AsiaBatch10Relationships2026,
  candidatePriorityP0AsiaBatch10RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-10-2026";
import {
  candidatePriorityP0AsiaBatch11GroupMembers2026,
  candidatePriorityP0AsiaBatch11People2026,
  candidatePriorityP0AsiaBatch11Placements2026,
  candidatePriorityP0AsiaBatch11Relationships2026,
  candidatePriorityP0AsiaBatch11RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-11-2026";
import {
  candidatePriorityP0AsiaBatch12GroupMembers2026,
  candidatePriorityP0AsiaBatch12People2026,
  candidatePriorityP0AsiaBatch12Placements2026,
  candidatePriorityP0AsiaBatch12Relationships2026,
  candidatePriorityP0AsiaBatch12RosterPromotions2026,
} from "../app/candidate-priority-p0-asia-batch-12-2026";
import {
  candidatePriorityP0EuropeBatch6GroupMembers2026,
  candidatePriorityP0EuropeBatch6People2026,
  candidatePriorityP0EuropeBatch6Placements2026,
  candidatePriorityP0EuropeBatch6Relationships2026,
  candidatePriorityP0EuropeBatch6RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-6-2026";
import {
  candidatePriorityP0EuropeBatch7GroupMembers2026,
  candidatePriorityP0EuropeBatch7People2026,
  candidatePriorityP0EuropeBatch7Placements2026,
  candidatePriorityP0EuropeBatch7Relationships2026,
  candidatePriorityP0EuropeBatch7RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-7-2026";
import {
  candidatePriorityP0EuropeBatch8GroupMembers2026,
  candidatePriorityP0EuropeBatch8People2026,
  candidatePriorityP0EuropeBatch8Placements2026,
  candidatePriorityP0EuropeBatch8Relationships2026,
  candidatePriorityP0EuropeBatch8RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-8-2026";
import {
  candidatePriorityP0EuropeBatch9GroupMembers2026,
  candidatePriorityP0EuropeBatch9People2026,
  candidatePriorityP0EuropeBatch9Placements2026,
  candidatePriorityP0EuropeBatch9Relationships2026,
  candidatePriorityP0EuropeBatch9RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-9-2026";
import {
  candidatePriorityP0EuropeBatch10GroupMembers2026,
  candidatePriorityP0EuropeBatch10People2026,
  candidatePriorityP0EuropeBatch10Placements2026,
  candidatePriorityP0EuropeBatch10Relationships2026,
  candidatePriorityP0EuropeBatch10RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-10-2026";
import {
  candidatePriorityP0EuropeBatch11GroupMembers2026,
  candidatePriorityP0EuropeBatch11People2026,
  candidatePriorityP0EuropeBatch11Placements2026,
  candidatePriorityP0EuropeBatch11Relationships2026,
  candidatePriorityP0EuropeBatch11RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-11-2026";
import {
  candidatePriorityP0EuropeBatch12GroupMembers2026,
  candidatePriorityP0EuropeBatch12People2026,
  candidatePriorityP0EuropeBatch12Placements2026,
  candidatePriorityP0EuropeBatch12Relationships2026,
  candidatePriorityP0EuropeBatch12RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-12-2026";
import {
  candidatePriorityP0EuropeBatch13GroupMembers2026,
  candidatePriorityP0EuropeBatch13People2026,
  candidatePriorityP0EuropeBatch13Placements2026,
  candidatePriorityP0EuropeBatch13Relationships2026,
  candidatePriorityP0EuropeBatch13RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-13-2026";
import {
  candidatePriorityP0EuropeBatch14GroupMembers2026,
  candidatePriorityP0EuropeBatch14People2026,
  candidatePriorityP0EuropeBatch14Placements2026,
  candidatePriorityP0EuropeBatch14Relationships2026,
  candidatePriorityP0EuropeBatch14RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-14-2026";
import {
  candidatePriorityP0EuropeBatch15GroupMembers2026,
  candidatePriorityP0EuropeBatch15People2026,
  candidatePriorityP0EuropeBatch15Placements2026,
  candidatePriorityP0EuropeBatch15Relationships2026,
  candidatePriorityP0EuropeBatch15RosterPromotions2026,
  candidatePriorityP0EuropeBatch15SupportingPeople2026,
} from "../app/candidate-priority-p0-europe-batch-15-2026";
import {
  candidatePriorityP0EuropeBatch16GroupMembers2026,
  candidatePriorityP0EuropeBatch16People2026,
  candidatePriorityP0EuropeBatch16Placements2026,
  candidatePriorityP0EuropeBatch16Relationships2026,
  candidatePriorityP0EuropeBatch16RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-16-2026";
import {
  candidatePriorityP0EuropeBatch17GroupMembers2026,
  candidatePriorityP0EuropeBatch17People2026,
  candidatePriorityP0EuropeBatch17Placements2026,
  candidatePriorityP0EuropeBatch17Relationships2026,
  candidatePriorityP0EuropeBatch17RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-17-2026";
import {
  candidatePriorityP0EuropeBatch18GroupMembers2026,
  candidatePriorityP0EuropeBatch18People2026,
  candidatePriorityP0EuropeBatch18Placements2026,
  candidatePriorityP0EuropeBatch18Relationships2026,
  candidatePriorityP0EuropeBatch18RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-batch-18-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch6GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch6People2026,
  candidatePriorityP0UsCanadaReadyBatch6Placements2026,
  candidatePriorityP0UsCanadaReadyBatch6Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch6RosterPromotions2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-6-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch7GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch7People2026,
  candidatePriorityP0UsCanadaReadyBatch7Placements2026,
  candidatePriorityP0UsCanadaReadyBatch7Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch7RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch7SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-7-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch8GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch8People2026,
  candidatePriorityP0UsCanadaReadyBatch8Placements2026,
  candidatePriorityP0UsCanadaReadyBatch8Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch8RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch8SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-8-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch9GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch9People2026,
  candidatePriorityP0UsCanadaReadyBatch9Placements2026,
  candidatePriorityP0UsCanadaReadyBatch9Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch9RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch9SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-9-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch10GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch10People2026,
  candidatePriorityP0UsCanadaReadyBatch10Placements2026,
  candidatePriorityP0UsCanadaReadyBatch10Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch10RosterPromotions2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-10-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch11GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch11People2026,
  candidatePriorityP0UsCanadaReadyBatch11Placements2026,
  candidatePriorityP0UsCanadaReadyBatch11Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch11RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch11SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-11-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch12GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch12People2026,
  candidatePriorityP0UsCanadaReadyBatch12Placements2026,
  candidatePriorityP0UsCanadaReadyBatch12Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch12RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch12SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-12-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch13GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch13People2026,
  candidatePriorityP0UsCanadaReadyBatch13Placements2026,
  candidatePriorityP0UsCanadaReadyBatch13Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch13RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch13SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-13-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch14GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch14People2026,
  candidatePriorityP0UsCanadaReadyBatch14Placements2026,
  candidatePriorityP0UsCanadaReadyBatch14Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch14RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch14SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-14-2026";
import {
  candidatePriorityP0UsCanadaReadyBatch15GroupMembers2026,
  candidatePriorityP0UsCanadaReadyBatch15People2026,
  candidatePriorityP0UsCanadaReadyBatch15Placements2026,
  candidatePriorityP0UsCanadaReadyBatch15Relationships2026,
  candidatePriorityP0UsCanadaReadyBatch15RosterPromotions2026,
  candidatePriorityP0UsCanadaReadyBatch15SupportingPeople2026,
} from "../app/candidate-priority-p0-us-canada-ready-batch-15-2026";
import {
  candidatePriorityP0MainlandTailBatch1GroupMembers2026,
  candidatePriorityP0MainlandTailBatch1People2026,
  candidatePriorityP0MainlandTailBatch1Placements2026,
  candidatePriorityP0MainlandTailBatch1Relationships2026,
  candidatePriorityP0MainlandTailBatch1RosterPromotions2026,
  candidatePriorityP0MainlandTailBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-tail-batch-1-2026";
import {
  candidatePriorityP0HkSgTailGroupMembers2026,
  candidatePriorityP0HkSgTailPeople2026,
  candidatePriorityP0HkSgTailPlacements2026,
  candidatePriorityP0HkSgTailRelationships2026,
  candidatePriorityP0HkSgTailRosterPromotions2026,
  candidatePriorityP0HkSgTailSupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-tail-batch-2026";
import {
  candidatePriorityP0HkSgTailBatch2GroupMembers2026,
  candidatePriorityP0HkSgTailBatch2People2026,
  candidatePriorityP0HkSgTailBatch2Placements2026,
  candidatePriorityP0HkSgTailBatch2Relationships2026,
  candidatePriorityP0HkSgTailBatch2RosterPromotions2026,
  candidatePriorityP0HkSgTailBatch2SupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-tail-batch-2-2026";
import {
  candidatePriorityP0MainlandTailBatch2GroupMembers2026,
  candidatePriorityP0MainlandTailBatch2People2026,
  candidatePriorityP0MainlandTailBatch2Placements2026,
  candidatePriorityP0MainlandTailBatch2Relationships2026,
  candidatePriorityP0MainlandTailBatch2RosterPromotions2026,
  candidatePriorityP0MainlandTailBatch2SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-tail-batch-2-2026";
import {
  candidatePriorityP0MainlandTailBatch3GroupMembers2026,
  candidatePriorityP0MainlandTailBatch3People2026,
  candidatePriorityP0MainlandTailBatch3Placements2026,
  candidatePriorityP0MainlandTailBatch3Relationships2026,
  candidatePriorityP0MainlandTailBatch3RosterPromotions2026,
  candidatePriorityP0MainlandTailBatch3SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-tail-batch-3-2026";
import {
  candidatePriorityP0HkSgTailBatch3GroupMembers2026,
  candidatePriorityP0HkSgTailBatch3People2026,
  candidatePriorityP0HkSgTailBatch3Placements2026,
  candidatePriorityP0HkSgTailBatch3Relationships2026,
  candidatePriorityP0HkSgTailBatch3RosterPromotions2026,
  candidatePriorityP0HkSgTailBatch3SupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-tail-batch-3-2026";
import {
  candidatePriorityP0MainlandFullBatch1GroupMembers2026,
  candidatePriorityP0MainlandFullBatch1People2026,
  candidatePriorityP0MainlandFullBatch1Placements2026,
  candidatePriorityP0MainlandFullBatch1Relationships2026,
  candidatePriorityP0MainlandFullBatch1RosterPromotions2026,
  candidatePriorityP0MainlandFullBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-full-batch-1-2026";
import {
  GroupMembers as candidatePriorityP0HkSgFullBatchAllGroupMembers2026,
  People as candidatePriorityP0HkSgFullBatchPeople2026,
  Relationships as candidatePriorityP0HkSgFullBatchRelationships2026,
  RosterPromotions as candidatePriorityP0HkSgFullBatchAllRosterPromotions2026,
} from "../app/candidate-priority-p0-hk-sg-full-batch-2026";
import {
  candidatePriorityP0EuropeFullBatch1GroupMembers2026,
  candidatePriorityP0EuropeFullBatch1People2026,
  candidatePriorityP0EuropeFullBatch1Placements2026,
  candidatePriorityP0EuropeFullBatch1Relationships2026,
  candidatePriorityP0EuropeFullBatch1RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-full-batch-1-2026";
import {
  candidatePriorityP0EuropeFullBatch2GroupMembers2026,
  candidatePriorityP0EuropeFullBatch2People2026,
  candidatePriorityP0EuropeFullBatch2Placements2026,
  candidatePriorityP0EuropeFullBatch2Relationships2026,
  candidatePriorityP0EuropeFullBatch2RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-full-batch-2-2026";
import {
  candidatePriorityP0EuropeFullBatch3GroupMembers2026,
  candidatePriorityP0EuropeFullBatch3People2026,
  candidatePriorityP0EuropeFullBatch3Placements2026,
  candidatePriorityP0EuropeFullBatch3Relationships2026,
  candidatePriorityP0EuropeFullBatch3RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-full-batch-3-2026";
import {
  candidatePriorityP0EuropeFullBatch4GroupMembers2026,
  candidatePriorityP0EuropeFullBatch4People2026,
  candidatePriorityP0EuropeFullBatch4Placements2026,
  candidatePriorityP0EuropeFullBatch4Relationships2026,
  candidatePriorityP0EuropeFullBatch4RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-full-batch-4-2026";
import {
  candidatePriorityP0EuropeFullBatch5GroupMembers2026,
  candidatePriorityP0EuropeFullBatch5People2026,
  candidatePriorityP0EuropeFullBatch5Placements2026,
  candidatePriorityP0EuropeFullBatch5Relationships2026,
  candidatePriorityP0EuropeFullBatch5RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-full-batch-5-2026";
import {
  candidatePriorityP0MainlandSecondPassBatch1GroupMembers2026,
  candidatePriorityP0MainlandSecondPassBatch1People2026,
  candidatePriorityP0MainlandSecondPassBatch1Placements2026,
  candidatePriorityP0MainlandSecondPassBatch1Relationships2026,
  candidatePriorityP0MainlandSecondPassBatch1RosterPromotions2026,
  candidatePriorityP0MainlandSecondPassBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-second-pass-batch-1-2026";
import {
  candidatePriorityP0EuropeSecondRoundBatch1GroupMembers2026,
  candidatePriorityP0EuropeSecondRoundBatch1People2026,
  candidatePriorityP0EuropeSecondRoundBatch1Placements2026,
  candidatePriorityP0EuropeSecondRoundBatch1Relationships2026,
  candidatePriorityP0EuropeSecondRoundBatch1RosterPromotions2026,
} from "../app/candidate-priority-p0-europe-second-round-batch-1-2026";
import {
  candidatePriorityP0HkSgSecondRoundPeople2026,
  candidatePriorityP0HkSgSecondRoundRelationships2026,
  candidatePriorityP0HkSgSecondRoundRosterPromotions2026,
  candidatePriorityP0HkSgSecondRoundSupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-second-round-batch-2026";
import {
  candidatePriorityP0EuropeThirdRoundBatch1GroupMembers2026,
  candidatePriorityP0EuropeThirdRoundBatch1People2026,
  candidatePriorityP0EuropeThirdRoundBatch1Placements2026,
  candidatePriorityP0EuropeThirdRoundBatch1Relationships2026,
  candidatePriorityP0EuropeThirdRoundBatch1RosterPromotions2026,
  candidatePriorityP0EuropeThirdRoundBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-europe-third-round-batch-1-2026";
import {
  candidatePriorityP0HkSgThirdRoundPeople2026,
  candidatePriorityP0HkSgThirdRoundRelationships2026,
  candidatePriorityP0HkSgThirdRoundRosterPromotions2026,
  candidatePriorityP0HkSgThirdRoundSupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-third-round-batch-2026";
import {
  candidatePriorityP0EuropeFourthRoundBatch1GroupMembers2026,
  candidatePriorityP0EuropeFourthRoundBatch1People2026,
  candidatePriorityP0EuropeFourthRoundBatch1Placements2026,
  candidatePriorityP0EuropeFourthRoundBatch1Relationships2026,
  candidatePriorityP0EuropeFourthRoundBatch1RosterPromotions2026,
  candidatePriorityP0EuropeFourthRoundBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-europe-fourth-round-batch-1-2026";
import {
  candidatePriorityP0MainlandThirdPassBatch1GroupMembers2026,
  candidatePriorityP0MainlandThirdPassBatch1People2026,
  candidatePriorityP0MainlandThirdPassBatch1Placements2026,
  candidatePriorityP0MainlandThirdPassBatch1Relationships2026,
  candidatePriorityP0MainlandThirdPassBatch1RosterPromotions2026,
  candidatePriorityP0MainlandThirdPassBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-third-pass-batch-1-2026";
import {
  candidatePriorityP0HkSgFourthRoundPeople2026,
  candidatePriorityP0HkSgFourthRoundRelationships2026,
  candidatePriorityP0HkSgFourthRoundRosterPromotions2026,
  candidatePriorityP0HkSgFourthRoundSupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-fourth-round-batch-2026";
import {
  candidatePriorityP0HkSgFifthRoundPeople2026,
  candidatePriorityP0HkSgFifthRoundRelationships2026,
  candidatePriorityP0HkSgFifthRoundRosterPromotions2026,
  candidatePriorityP0HkSgFifthRoundSupportingPeople2026,
} from "../app/candidate-priority-p0-hk-sg-fifth-round-batch-2026";
import {
  candidatePriorityP0MainlandFourthPassBatch1GroupMembers2026,
  candidatePriorityP0MainlandFourthPassBatch1People2026,
  candidatePriorityP0MainlandFourthPassBatch1Placements2026,
  candidatePriorityP0MainlandFourthPassBatch1Relationships2026,
  candidatePriorityP0MainlandFourthPassBatch1RosterPromotions2026,
  candidatePriorityP0MainlandFourthPassBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-mainland-fourth-pass-batch-1-2026";
import {
  candidatePriorityP0EuropeFifthRoundBatch1GroupMembers2026,
  candidatePriorityP0EuropeFifthRoundBatch1People2026,
  candidatePriorityP0EuropeFifthRoundBatch1Placements2026,
  candidatePriorityP0EuropeFifthRoundBatch1Relationships2026,
  candidatePriorityP0EuropeFifthRoundBatch1RosterPromotions2026,
  candidatePriorityP0EuropeFifthRoundBatch1SupportingPeople2026,
} from "../app/candidate-priority-p0-europe-fifth-round-batch-1-2026";
import {
  candidatePriorityP0NextRoundGroupMembers2026,
  candidatePriorityP0NextRoundPeople2026,
  candidatePriorityP0NextRoundRelationships2026,
  candidatePriorityP0NextRoundRosterPromotions2026,
  candidatePriorityP0NextRoundSupportingPeople2026,
} from "../app/candidate-priority-p0-next-round-batch-2026";

type PriorityTier = "P0" | "P1" | "P2" | "P3" | "P4";

const outputPath = "data/candidate-priority-queue-2026-09-03.json";

const normalize = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const unitMetadata = new Map(
  topSchoolRosterScope.flatMap((school) => school.units.map((unit) => [
    unit.url,
    {
      region: school.region,
      institution: school.institution,
      institutionRank: school.rank,
      unitName: unit.name,
    },
  ] as const)),
);

const rosterCandidates = topSchoolRosterPersonAudits
  .filter((audit) => audit.decision === "candidate_new_pi")
  .map((audit) => {
    const metadata = unitMetadata.get(audit.unitUrl);
    if (!metadata) throw new Error(`Candidate unit is outside scope: ${audit.unitUrl}`);
    const hasSpecificProfile = audit.evidenceUrl !== audit.unitUrl;
    const tier: PriorityTier = hasSpecificProfile
      ? metadata.institutionRank <= 5 ? "P0" : metadata.institutionRank <= 10 ? "P1" : "P2"
      : metadata.institutionRank <= 10 ? "P3" : "P4";
    const score = Math.max(0, 21 - metadata.institutionRank) * 3
      + (hasSpecificProfile ? 40 : 0)
      + (metadata.institutionRank <= 5 ? 15 : metadata.institutionRank <= 10 ? 8 : 0);
    return {
      canonicalKey: `${metadata.region}:${metadata.institution}:${normalize(audit.rosterName)}`,
      name: audit.rosterName,
      ...metadata,
      unitUrl: audit.unitUrl,
      evidenceUrl: audit.evidenceUrl,
      hasSpecificProfile,
      tier,
      score,
      reason: audit.reason,
    };
  });

const grouped = new Map<string, typeof rosterCandidates>();
for (const candidate of rosterCandidates) {
  const entries = grouped.get(candidate.canonicalKey) ?? [];
  entries.push(candidate);
  grouped.set(candidate.canonicalKey, entries);
}

const atlasInstitutionByRosterInstitution: Record<string, string> = {
  "Carnegie Mellon University": "CMU",
  "University of Illinois Urbana-Champaign": "UIUC",
  "Stanford University": "Stanford",
  "Massachusetts Institute of Technology": "MIT",
  "University of California, Berkeley": "Berkeley",
  "清华大学": "THU",
  "北京大学": "PKU",
  "上海交通大学": "SJTU",
  "浙江大学": "ZJU",
  "南京大学": "NJU",
  "Technical University of Munich": "TUM",
  "EPFL": "EPFL",
  "ETH Zurich": "ETH Zurich",
  "University of Edinburgh": "Edinburgh",
  "University of Cambridge": "Cambridge",
  "香港科技大学": "HKUST",
  "香港大学": "HKU",
  "香港中文大学": "CUHK",
  "香港理工大学": "PolyU",
  "香港城市大学": "CityU",
  "National University of Singapore": "NUS",
  "Nanyang Technological University": "NTU",
  "Singapore University of Technology and Design": "SUTD",
  "Singapore Management University": "SMU",
  "Singapore Institute of Technology": "SIT",
};

const atlasPeopleByRegionInstitutionAndName = new Map<string, string[]>();
for (const person of atlasPeople) {
  if (!person.region || person.category === "historical") continue;
  for (const name of [person.name, person.chinese].filter((value): value is string => Boolean(value))) {
    const key = `${person.region}:${person.institution}:${normalize(name)}`;
    const ids = atlasPeopleByRegionInstitutionAndName.get(key) ?? [];
    if (!ids.includes(person.id)) ids.push(person.id);
    atlasPeopleByRegionInstitutionAndName.set(key, ids);
  }
}

const uniqueCandidates = Array.from(grouped.entries()).map(([canonicalKey, entries]) => {
  const ranked = [...entries].sort((a, b) => b.score - a.score || a.unitName.localeCompare(b.unitName));
  const best = ranked[0];
  return {
    canonicalKey,
    name: best.name,
    region: best.region,
    institution: best.institution,
    institutionRank: best.institutionRank,
    tier: best.tier,
    score: best.score + Math.min(10, entries.length - 1),
    hasSpecificProfile: entries.some((entry) => entry.hasSpecificProfile),
    evidenceUrl: best.evidenceUrl,
    possibleExistingAtlasMatches: atlasPeopleByRegionInstitutionAndName.get(
      `${best.region}:${atlasInstitutionByRosterInstitution[best.institution] ?? best.institution}:${normalize(best.name)}`,
    ) ?? [],
    rosterMemberships: entries.map((entry) => ({
      unitName: entry.unitName,
      unitUrl: entry.unitUrl,
      evidenceUrl: entry.evidenceUrl,
    })),
    gate: {
      officialCurrentPiVerified: true,
      profileEnriched: false,
      portraitVerified: false,
      relationshipVerified: false,
      readyForAtlas: false,
    },
  };
}).sort((a, b) => b.score - a.score || a.region.localeCompare(b.region) || a.institution.localeCompare(b.institution) || a.name.localeCompare(b.name));

const tierCounts = Object.fromEntries(
  (["P0", "P1", "P2", "P3", "P4"] as PriorityTier[]).map((tier) => [
    tier,
    uniqueCandidates.filter((candidate) => candidate.tier === tier).length,
  ]),
);
const possibleExistingDuplicateCount = uniqueCandidates.filter((candidate) => candidate.possibleExistingAtlasMatches.length > 0).length;

const batch2RosterPromotions = [
  ...candidatePriorityP0AsiaBatch2RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch2RosterPromotions2026,
  ...candidatePriorityP0UsCanadaBatch2RosterPromotions2026,
];
const batch2People = [
  ...candidatePriorityP0AsiaBatch2People2026,
  ...candidatePriorityP0EuropeBatch2People2026,
  ...candidatePriorityP0UsCanadaBatch2People2026,
];
const batch2SupportingPeople = candidatePriorityP0UsCanadaBatch2SupportingPeople2026;
const batch2Relationships = [
  ...candidatePriorityP0AsiaBatch2Relationships2026,
  ...candidatePriorityP0EuropeBatch2Relationships2026,
  ...candidatePriorityP0UsCanadaBatch2Relationships2026,
];
const batch2Placements = [
  ...candidatePriorityP0AsiaBatch2Placements2026,
  ...candidatePriorityP0EuropeBatch2Placements2026,
  ...candidatePriorityP0UsCanadaBatch2Placements2026,
];
const batch2GroupMembers = [
  ...candidatePriorityP0AsiaBatch2GroupMembers2026,
  ...candidatePriorityP0EuropeBatch2GroupMembers2026,
  ...candidatePriorityP0UsCanadaBatch2GroupMembers2026,
];
const batch3RosterPromotions = [
  ...candidatePriorityP0AsiaBatch3RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch3RosterPromotions2026,
  ...candidatePriorityP0UsCanadaBatch3RosterPromotions2026,
];
const batch3People = [
  ...candidatePriorityP0AsiaBatch3People2026,
  ...candidatePriorityP0EuropeBatch3People2026,
  ...candidatePriorityP0UsCanadaBatch3People2026,
];
const batch3SupportingPeople = candidatePriorityP0UsCanadaBatch3SupportingPeople2026;
const batch3Relationships = [
  ...candidatePriorityP0AsiaBatch3Relationships2026,
  ...candidatePriorityP0EuropeBatch3Relationships2026,
  ...candidatePriorityP0UsCanadaBatch3Relationships2026,
];
const batch3Placements = [
  ...candidatePriorityP0AsiaBatch3Placements2026,
  ...candidatePriorityP0EuropeBatch3Placements2026,
  ...candidatePriorityP0UsCanadaBatch3Placements2026,
];
const batch3GroupMembers = [
  ...candidatePriorityP0AsiaBatch3GroupMembers2026,
  ...candidatePriorityP0EuropeBatch3GroupMembers2026,
  ...candidatePriorityP0UsCanadaBatch3GroupMembers2026,
];
const batch4RosterPromotions = [
  ...candidatePriorityP0AsiaBatch4RosterPromotions2026,
  ...candidatePriorityP0EuropeRemainingReadyChunk1RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch4RosterPromotions2026,
];
const batch4People = [
  ...candidatePriorityP0AsiaBatch4People2026,
  ...candidatePriorityP0EuropeRemainingReadyChunk1People2026,
  ...candidatePriorityP0UsCanadaReadyBatch4People2026,
];
const batch4SupportingPeople = candidatePriorityP0UsCanadaReadyBatch4SupportingPeople2026;
const batch4Relationships = [
  ...candidatePriorityP0AsiaBatch4Relationships2026,
  ...candidatePriorityP0EuropeRemainingReadyChunk1Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch4Relationships2026,
];
const batch4Placements = [
  ...candidatePriorityP0AsiaBatch4Placements2026,
  ...candidatePriorityP0EuropeRemainingReadyChunk1Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch4Placements2026,
];
const batch4GroupMembers = [
  ...candidatePriorityP0AsiaBatch4GroupMembers2026,
  ...candidatePriorityP0EuropeRemainingReadyChunk1GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch4GroupMembers2026,
];
const batch5RosterPromotions = [
  ...candidatePriorityP0UsCanadaReadyBatch5RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026,
  ...candidatePriorityP0AsiaBatch5RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch5RosterPromotions2026,
];
const batch5People = [
  ...candidatePriorityP0UsCanadaReadyBatch5People2026,
  ...candidatePriorityP0AsiaBatch5People2026,
  ...candidatePriorityP0EuropeBatch5People2026,
];
const batch5SupportingPeople = candidatePriorityP0UsCanadaReadyBatch5SupportingPeople2026;
const batch5Relationships = [
  ...candidatePriorityP0UsCanadaReadyBatch5Relationships2026,
  ...candidatePriorityP0AsiaBatch5Relationships2026,
  ...candidatePriorityP0EuropeBatch5Relationships2026,
];
const batch5Placements = [
  ...candidatePriorityP0UsCanadaReadyBatch5Placements2026,
  ...candidatePriorityP0AsiaBatch5Placements2026,
  ...candidatePriorityP0EuropeBatch5Placements2026,
];
const batch5GroupMembers = [
  ...candidatePriorityP0UsCanadaReadyBatch5GroupMembers2026,
  ...candidatePriorityP0AsiaBatch5GroupMembers2026,
  ...candidatePriorityP0EuropeBatch5GroupMembers2026,
];
const batch6PlusRosterPromotions = [
  ...candidatePriorityP0AsiaBatch6RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch7RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch7DuplicateRosterPromotions2026,
  ...candidatePriorityP0AsiaBatch8RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch9RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch10RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch11RosterPromotions2026,
  ...candidatePriorityP0AsiaBatch12RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch6RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch7RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch8RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch9RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch10RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch11RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch12RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch13RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch14RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch15RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch16RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch17RosterPromotions2026,
  ...candidatePriorityP0EuropeBatch18RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch6RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch7RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch8RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch9RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch10RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch11RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch12RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch13RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch14RosterPromotions2026,
  ...candidatePriorityP0UsCanadaReadyBatch15RosterPromotions2026,
  ...candidatePriorityP0MainlandTailBatch1RosterPromotions2026,
  ...candidatePriorityP0HkSgTailRosterPromotions2026,
  ...candidatePriorityP0MainlandTailBatch2RosterPromotions2026,
  ...candidatePriorityP0HkSgTailBatch2RosterPromotions2026,
  ...candidatePriorityP0MainlandTailBatch3RosterPromotions2026,
  ...candidatePriorityP0HkSgTailBatch3RosterPromotions2026,
  ...candidatePriorityP0MainlandFullBatch1RosterPromotions2026,
  ...candidatePriorityP0HkSgFullBatchAllRosterPromotions2026,
  ...candidatePriorityP0EuropeFullBatch1RosterPromotions2026,
  ...candidatePriorityP0EuropeFullBatch2RosterPromotions2026,
  ...candidatePriorityP0EuropeFullBatch3RosterPromotions2026,
  ...candidatePriorityP0EuropeFullBatch4RosterPromotions2026,
  ...candidatePriorityP0EuropeFullBatch5RosterPromotions2026,
  ...candidatePriorityP0MainlandSecondPassBatch1RosterPromotions2026,
  ...candidatePriorityP0EuropeSecondRoundBatch1RosterPromotions2026,
  ...candidatePriorityP0HkSgSecondRoundRosterPromotions2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1RosterPromotions2026,
  ...candidatePriorityP0HkSgThirdRoundRosterPromotions2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1RosterPromotions2026,
  ...candidatePriorityP0MainlandThirdPassBatch1RosterPromotions2026,
  ...candidatePriorityP0HkSgFourthRoundRosterPromotions2026,
  ...candidatePriorityP0HkSgFifthRoundRosterPromotions2026,
  ...candidatePriorityP0MainlandFourthPassBatch1RosterPromotions2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1RosterPromotions2026,
  ...candidatePriorityP0NextRoundRosterPromotions2026,
];
const batch6PlusPeople = [
  ...candidatePriorityP0AsiaBatch6People2026,
  ...candidatePriorityP0AsiaBatch7People2026,
  ...candidatePriorityP0AsiaBatch8People2026,
  ...candidatePriorityP0AsiaBatch9People2026,
  ...candidatePriorityP0AsiaBatch10People2026,
  ...candidatePriorityP0AsiaBatch11People2026,
  ...candidatePriorityP0AsiaBatch12People2026,
  ...candidatePriorityP0EuropeBatch6People2026,
  ...candidatePriorityP0EuropeBatch7People2026,
  ...candidatePriorityP0EuropeBatch8People2026,
  ...candidatePriorityP0EuropeBatch9People2026,
  ...candidatePriorityP0EuropeBatch10People2026,
  ...candidatePriorityP0EuropeBatch11People2026,
  ...candidatePriorityP0EuropeBatch12People2026,
  ...candidatePriorityP0EuropeBatch13People2026,
  ...candidatePriorityP0EuropeBatch14People2026,
  ...candidatePriorityP0EuropeBatch15People2026,
  ...candidatePriorityP0EuropeBatch15SupportingPeople2026,
  ...candidatePriorityP0EuropeBatch16People2026,
  ...candidatePriorityP0EuropeBatch17People2026,
  ...candidatePriorityP0EuropeBatch18People2026,
  ...candidatePriorityP0UsCanadaReadyBatch6People2026,
  ...candidatePriorityP0UsCanadaReadyBatch7People2026,
  ...candidatePriorityP0UsCanadaReadyBatch8People2026,
  ...candidatePriorityP0UsCanadaReadyBatch9People2026,
  ...candidatePriorityP0UsCanadaReadyBatch10People2026,
  ...candidatePriorityP0UsCanadaReadyBatch11People2026,
  ...candidatePriorityP0UsCanadaReadyBatch12People2026,
  ...candidatePriorityP0UsCanadaReadyBatch13People2026,
  ...candidatePriorityP0UsCanadaReadyBatch14People2026,
  ...candidatePriorityP0UsCanadaReadyBatch15People2026,
  ...candidatePriorityP0MainlandTailBatch1People2026,
  ...candidatePriorityP0MainlandTailBatch1SupportingPeople2026,
  ...candidatePriorityP0HkSgTailPeople2026,
  ...candidatePriorityP0HkSgTailSupportingPeople2026,
  ...candidatePriorityP0MainlandTailBatch2People2026,
  ...candidatePriorityP0MainlandTailBatch2SupportingPeople2026,
  ...candidatePriorityP0HkSgTailBatch2People2026,
  ...candidatePriorityP0HkSgTailBatch2SupportingPeople2026,
  ...candidatePriorityP0MainlandTailBatch3People2026,
  ...candidatePriorityP0MainlandTailBatch3SupportingPeople2026,
  ...candidatePriorityP0HkSgTailBatch3People2026,
  ...candidatePriorityP0HkSgTailBatch3SupportingPeople2026,
  ...candidatePriorityP0MainlandFullBatch1People2026,
  ...candidatePriorityP0MainlandFullBatch1SupportingPeople2026.filter((person) => person.id !== "xihong-wu-p0-full-b1-support"),
  ...candidatePriorityP0HkSgFullBatchPeople2026,
  ...candidatePriorityP0EuropeFullBatch1People2026,
  ...candidatePriorityP0EuropeFullBatch2People2026,
  ...candidatePriorityP0EuropeFullBatch3People2026,
  ...candidatePriorityP0EuropeFullBatch4People2026,
  ...candidatePriorityP0EuropeFullBatch5People2026,
  ...candidatePriorityP0MainlandSecondPassBatch1People2026,
  ...candidatePriorityP0MainlandSecondPassBatch1SupportingPeople2026,
  ...candidatePriorityP0EuropeSecondRoundBatch1People2026,
  ...candidatePriorityP0HkSgSecondRoundPeople2026,
  ...candidatePriorityP0HkSgSecondRoundSupportingPeople2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1People2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1SupportingPeople2026,
  ...candidatePriorityP0HkSgThirdRoundPeople2026,
  ...candidatePriorityP0HkSgThirdRoundSupportingPeople2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1People2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1SupportingPeople2026,
  ...candidatePriorityP0MainlandThirdPassBatch1People2026,
  ...candidatePriorityP0MainlandThirdPassBatch1SupportingPeople2026,
  ...candidatePriorityP0HkSgFourthRoundPeople2026,
  ...candidatePriorityP0HkSgFourthRoundSupportingPeople2026,
  ...candidatePriorityP0HkSgFifthRoundPeople2026,
  ...candidatePriorityP0HkSgFifthRoundSupportingPeople2026,
  ...candidatePriorityP0MainlandFourthPassBatch1People2026,
  ...candidatePriorityP0MainlandFourthPassBatch1SupportingPeople2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1People2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1SupportingPeople2026,
  ...candidatePriorityP0NextRoundPeople2026,
];
const batch6PlusSupportingPeople = [
  ...candidatePriorityP0UsCanadaReadyBatch7SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch8SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch9SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch11SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch12SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch13SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch14SupportingPeople2026,
  ...candidatePriorityP0UsCanadaReadyBatch15SupportingPeople2026,
  ...candidatePriorityP0NextRoundSupportingPeople2026,
];
const batch6PlusRelationships = [
  ...candidatePriorityP0AsiaBatch6Relationships2026,
  ...candidatePriorityP0AsiaBatch7Relationships2026,
  ...candidatePriorityP0AsiaBatch8Relationships2026,
  ...candidatePriorityP0AsiaBatch9Relationships2026,
  ...candidatePriorityP0AsiaBatch10Relationships2026,
  ...candidatePriorityP0AsiaBatch11Relationships2026,
  ...candidatePriorityP0AsiaBatch12Relationships2026,
  ...candidatePriorityP0EuropeBatch6Relationships2026,
  ...candidatePriorityP0EuropeBatch7Relationships2026,
  ...candidatePriorityP0EuropeBatch8Relationships2026,
  ...candidatePriorityP0EuropeBatch9Relationships2026,
  ...candidatePriorityP0EuropeBatch10Relationships2026,
  ...candidatePriorityP0EuropeBatch11Relationships2026,
  ...candidatePriorityP0EuropeBatch12Relationships2026,
  ...candidatePriorityP0EuropeBatch13Relationships2026,
  ...candidatePriorityP0EuropeBatch14Relationships2026,
  ...candidatePriorityP0EuropeBatch15Relationships2026,
  ...candidatePriorityP0EuropeBatch16Relationships2026,
  ...candidatePriorityP0EuropeBatch17Relationships2026,
  ...candidatePriorityP0EuropeBatch18Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch6Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch7Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch8Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch9Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch10Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch11Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch12Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch13Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch14Relationships2026,
  ...candidatePriorityP0UsCanadaReadyBatch15Relationships2026,
  ...candidatePriorityP0MainlandTailBatch1Relationships2026,
  ...candidatePriorityP0HkSgTailRelationships2026,
  ...candidatePriorityP0MainlandTailBatch2Relationships2026,
  ...candidatePriorityP0HkSgTailBatch2Relationships2026,
  ...candidatePriorityP0MainlandTailBatch3Relationships2026,
  ...candidatePriorityP0HkSgTailBatch3Relationships2026,
  ...candidatePriorityP0MainlandFullBatch1Relationships2026,
  ...candidatePriorityP0HkSgFullBatchRelationships2026,
  ...candidatePriorityP0EuropeFullBatch1Relationships2026,
  ...candidatePriorityP0EuropeFullBatch2Relationships2026,
  ...candidatePriorityP0EuropeFullBatch3Relationships2026,
  ...candidatePriorityP0EuropeFullBatch4Relationships2026,
  ...candidatePriorityP0EuropeFullBatch5Relationships2026,
  ...candidatePriorityP0MainlandSecondPassBatch1Relationships2026,
  ...candidatePriorityP0EuropeSecondRoundBatch1Relationships2026,
  ...candidatePriorityP0HkSgSecondRoundRelationships2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1Relationships2026,
  ...candidatePriorityP0HkSgThirdRoundRelationships2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1Relationships2026,
  ...candidatePriorityP0MainlandThirdPassBatch1Relationships2026,
  ...candidatePriorityP0HkSgFourthRoundRelationships2026,
  ...candidatePriorityP0HkSgFifthRoundRelationships2026,
  ...candidatePriorityP0MainlandFourthPassBatch1Relationships2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1Relationships2026,
  ...candidatePriorityP0NextRoundRelationships2026,
];
const batch6PlusPlacements = [
  ...candidatePriorityP0AsiaBatch6Placements2026,
  ...candidatePriorityP0AsiaBatch7Placements2026,
  ...candidatePriorityP0AsiaBatch8Placements2026,
  ...candidatePriorityP0AsiaBatch9Placements2026,
  ...candidatePriorityP0AsiaBatch10Placements2026,
  ...candidatePriorityP0AsiaBatch11Placements2026,
  ...candidatePriorityP0AsiaBatch12Placements2026,
  ...candidatePriorityP0EuropeBatch6Placements2026,
  ...candidatePriorityP0EuropeBatch7Placements2026,
  ...candidatePriorityP0EuropeBatch8Placements2026,
  ...candidatePriorityP0EuropeBatch9Placements2026,
  ...candidatePriorityP0EuropeBatch10Placements2026,
  ...candidatePriorityP0EuropeBatch11Placements2026,
  ...candidatePriorityP0EuropeBatch12Placements2026,
  ...candidatePriorityP0EuropeBatch13Placements2026,
  ...candidatePriorityP0EuropeBatch14Placements2026,
  ...candidatePriorityP0EuropeBatch15Placements2026,
  ...candidatePriorityP0EuropeBatch16Placements2026,
  ...candidatePriorityP0EuropeBatch17Placements2026,
  ...candidatePriorityP0EuropeBatch18Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch6Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch7Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch8Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch9Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch10Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch11Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch12Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch13Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch14Placements2026,
  ...candidatePriorityP0UsCanadaReadyBatch15Placements2026,
  ...candidatePriorityP0MainlandTailBatch1Placements2026,
  ...candidatePriorityP0HkSgTailPlacements2026,
  ...candidatePriorityP0MainlandTailBatch2Placements2026,
  ...candidatePriorityP0HkSgTailBatch2Placements2026,
  ...candidatePriorityP0MainlandTailBatch3Placements2026,
  ...candidatePriorityP0HkSgTailBatch3Placements2026,
  ...candidatePriorityP0MainlandFullBatch1Placements2026,
  ...candidatePriorityP0EuropeFullBatch1Placements2026,
  ...candidatePriorityP0EuropeFullBatch2Placements2026,
  ...candidatePriorityP0EuropeFullBatch3Placements2026,
  ...candidatePriorityP0EuropeFullBatch4Placements2026,
  ...candidatePriorityP0EuropeFullBatch5Placements2026,
  ...candidatePriorityP0MainlandSecondPassBatch1Placements2026,
  ...candidatePriorityP0EuropeSecondRoundBatch1Placements2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1Placements2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1Placements2026,
  ...candidatePriorityP0MainlandThirdPassBatch1Placements2026,
  ...candidatePriorityP0MainlandFourthPassBatch1Placements2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1Placements2026,
];
const batch6PlusGroupMembers = [
  ...candidatePriorityP0AsiaBatch6GroupMembers2026,
  ...candidatePriorityP0AsiaBatch7GroupMembers2026,
  ...candidatePriorityP0AsiaBatch8GroupMembers2026,
  ...candidatePriorityP0AsiaBatch9GroupMembers2026,
  ...candidatePriorityP0AsiaBatch10GroupMembers2026,
  ...candidatePriorityP0AsiaBatch11GroupMembers2026,
  ...candidatePriorityP0AsiaBatch12GroupMembers2026,
  ...candidatePriorityP0EuropeBatch6GroupMembers2026,
  ...candidatePriorityP0EuropeBatch7GroupMembers2026,
  ...candidatePriorityP0EuropeBatch8GroupMembers2026,
  ...candidatePriorityP0EuropeBatch9GroupMembers2026,
  ...candidatePriorityP0EuropeBatch10GroupMembers2026,
  ...candidatePriorityP0EuropeBatch11GroupMembers2026,
  ...candidatePriorityP0EuropeBatch12GroupMembers2026,
  ...candidatePriorityP0EuropeBatch13GroupMembers2026,
  ...candidatePriorityP0EuropeBatch14GroupMembers2026,
  ...candidatePriorityP0EuropeBatch15GroupMembers2026,
  ...candidatePriorityP0EuropeBatch16GroupMembers2026,
  ...candidatePriorityP0EuropeBatch17GroupMembers2026,
  ...candidatePriorityP0EuropeBatch18GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch6GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch7GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch8GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch9GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch10GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch11GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch12GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch13GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch14GroupMembers2026,
  ...candidatePriorityP0UsCanadaReadyBatch15GroupMembers2026,
  ...candidatePriorityP0MainlandTailBatch1GroupMembers2026,
  ...candidatePriorityP0HkSgTailGroupMembers2026,
  ...candidatePriorityP0MainlandTailBatch2GroupMembers2026,
  ...candidatePriorityP0HkSgTailBatch2GroupMembers2026,
  ...candidatePriorityP0MainlandTailBatch3GroupMembers2026,
  ...candidatePriorityP0HkSgTailBatch3GroupMembers2026,
  ...candidatePriorityP0MainlandFullBatch1GroupMembers2026,
  ...candidatePriorityP0HkSgFullBatchAllGroupMembers2026,
  ...candidatePriorityP0EuropeFullBatch1GroupMembers2026,
  ...candidatePriorityP0EuropeFullBatch2GroupMembers2026,
  ...candidatePriorityP0EuropeFullBatch3GroupMembers2026,
  ...candidatePriorityP0EuropeFullBatch4GroupMembers2026,
  ...candidatePriorityP0EuropeFullBatch5GroupMembers2026,
  ...candidatePriorityP0MainlandSecondPassBatch1GroupMembers2026,
  ...candidatePriorityP0EuropeSecondRoundBatch1GroupMembers2026,
  ...candidatePriorityP0EuropeThirdRoundBatch1GroupMembers2026,
  ...candidatePriorityP0EuropeFourthRoundBatch1GroupMembers2026,
  ...candidatePriorityP0MainlandThirdPassBatch1GroupMembers2026,
  ...candidatePriorityP0MainlandFourthPassBatch1GroupMembers2026,
  ...candidatePriorityP0EuropeFifthRoundBatch1GroupMembers2026,
  ...candidatePriorityP0NextRoundGroupMembers2026,
];

const report = {
  generatedAt: "2026-09-03",
  policy: {
    objective: "按学校影响力与一手资料完整度排序；正式接入仍须通过头像、履历、来源和至少一条关系证据门槛。",
    tiers: {
      P0: "地区 Top 5 学校，且已有独立个人资料页",
      P1: "地区 Top 6–10 学校，且已有独立个人资料页",
      P2: "其他学校，且已有独立个人资料页",
      P3: "地区 Top 10 学校，目前只有院系名录证据",
      P4: "其他仅有院系名录证据的候选",
    },
    qualityGate: ["现任独立 PI", "至少两条来源", "3–5 条带来源事实", "512×512 可靠头像", "至少一条可核验师承、学生、合作或产业关系"],
  },
  rosterCandidateRecords: rosterCandidates.length,
  uniqueCandidateEstimate: uniqueCandidates.length,
  duplicateRosterMembershipsCollapsed: rosterCandidates.length - uniqueCandidates.length,
  possibleExistingDuplicateCount,
  tierCounts,
  completedBatch: {
    name: "through-p0-batch-15-and-existing-match-cleanup",
    promotedRosterCandidates: 9 + batch2RosterPromotions.length + batch3RosterPromotions.length + batch4RosterPromotions.length + batch5RosterPromotions.length + batch6PlusRosterPromotions.length + candidatePriorityExistingMatchPromotions2026.length,
    linkedExistingRosterCandidates: candidatePriorityExistingMatchPromotions2026.length + candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026.length,
    addedNetworkEndpointPeople: candidatePriorityBatch1People2026.length + batch2People.length + batch2SupportingPeople.length + batch3People.length + batch3SupportingPeople.length + batch4People.length + batch4SupportingPeople.length + batch5People.length + batch5SupportingPeople.length + batch6PlusPeople.length + batch6PlusSupportingPeople.length,
    addedVerifiedRelationships: candidatePriorityBatch1Relationships2026.length + batch2Relationships.length + batch3Relationships.length + batch4Relationships.length + batch5Relationships.length + batch6PlusRelationships.length,
    addedVerifiedAcademicPlacements: candidatePriorityBatch1Placements2026.length + batch2Placements.length + batch3Placements.length + batch4Placements.length + batch5Placements.length + batch6PlusPlacements.length,
    addedVerifiedGroupMembers: batch2GroupMembers.length + batch3GroupMembers.length + batch4GroupMembers.length + batch5GroupMembers.length + batch6PlusGroupMembers.length,
  },
  completedBatches: [
    {
      name: "batch-1",
      promotedRosterCandidates: 9,
      addedNetworkEndpointPeople: candidatePriorityBatch1People2026.length,
      addedVerifiedRelationships: candidatePriorityBatch1Relationships2026.length,
      addedVerifiedAcademicPlacements: candidatePriorityBatch1Placements2026.length,
      addedVerifiedGroupMembers: 0,
    },
    {
      name: "p0-batch-2",
      promotedRosterCandidates: batch2RosterPromotions.length,
      addedNetworkEndpointPeople: batch2People.length + batch2SupportingPeople.length,
      addedVerifiedRelationships: batch2Relationships.length,
      addedVerifiedAcademicPlacements: batch2Placements.length,
      addedVerifiedGroupMembers: batch2GroupMembers.length,
    },
    {
      name: "p0-batch-3",
      promotedRosterCandidates: batch3RosterPromotions.length,
      addedNetworkEndpointPeople: batch3People.length + batch3SupportingPeople.length,
      addedVerifiedRelationships: batch3Relationships.length,
      addedVerifiedAcademicPlacements: batch3Placements.length,
      addedVerifiedGroupMembers: batch3GroupMembers.length,
    },
    {
      name: "existing-atlas-match-cleanup",
      promotedRosterCandidates: candidatePriorityExistingMatchPromotions2026.length,
      linkedExistingRosterCandidates: candidatePriorityExistingMatchPromotions2026.length,
      addedNetworkEndpointPeople: 0,
      addedVerifiedRelationships: 0,
      addedVerifiedAcademicPlacements: 0,
      addedVerifiedGroupMembers: 0,
    },
    {
      name: "p0-batch-4",
      promotedRosterCandidates: batch4RosterPromotions.length,
      addedNetworkEndpointPeople: batch4People.length + batch4SupportingPeople.length,
      addedVerifiedRelationships: batch4Relationships.length,
      addedVerifiedAcademicPlacements: batch4Placements.length,
      addedVerifiedGroupMembers: batch4GroupMembers.length,
    },
    {
      name: "p0-batch-5",
      promotedRosterCandidates: batch5RosterPromotions.length,
      linkedExistingRosterCandidates: candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026.length,
      addedNetworkEndpointPeople: batch5People.length + batch5SupportingPeople.length,
      addedVerifiedRelationships: batch5Relationships.length,
      addedVerifiedAcademicPlacements: batch5Placements.length,
      addedVerifiedGroupMembers: batch5GroupMembers.length,
    },
    {
      name: "p0-batches-6-to-8",
      promotedRosterCandidates: batch6PlusRosterPromotions.length,
      addedNetworkEndpointPeople: batch6PlusPeople.length + batch6PlusSupportingPeople.length,
      addedVerifiedRelationships: batch6PlusRelationships.length,
      addedVerifiedAcademicPlacements: batch6PlusPlacements.length,
      addedVerifiedGroupMembers: batch6PlusGroupMembers.length,
    },
  ],
  candidates: uniqueCandidates,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  outputPath,
  rosterCandidateRecords: report.rosterCandidateRecords,
  uniqueCandidateEstimate: report.uniqueCandidateEstimate,
  duplicateRosterMembershipsCollapsed: report.duplicateRosterMembershipsCollapsed,
  possibleExistingDuplicateCount: report.possibleExistingDuplicateCount,
  tierCounts: report.tierCounts,
  nextCandidatePreview: uniqueCandidates.slice(0, 20).map((candidate) => ({
    name: candidate.name,
    institution: candidate.institution,
    tier: candidate.tier,
    score: candidate.score,
  })),
}, null, 2));
