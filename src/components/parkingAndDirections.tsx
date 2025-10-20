"use client";

import greatParkParkingLots from "@/../public/images/great-park-parking-lots.png";
import directionsGridlock from "@/../public/images/woodbridge-gridlock.png";
import Image from "next/image";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Alert } from "@heroui/alert";
import { ParkingInstructionType, ParkingInstructionTypes } from "@/types";
import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import { dates } from "@/config/dates";
import { urls } from "@/config/data";
import { Button } from "@heroui/button";

const locations = {
  lot0: "33.67441530099316%2C-117.74813794406717",
  lot1: "33.67415547083599%2C-117.74815275109665",
  lot2: "33.67614981951949%2C-117.74483361819793",
  lot3: "33.67435940869166%2C-117.74097384535757",
  lot4: "33.67535880565344%2C-117.73544093394585",
  lot5: "33.669419217851036%2C-117.73792923917985",
  lot6: "33.668434811890535%2C-117.74149029360404",
  lot7: "33.66996071213284%2C-117.74523029229603",
  lot8: "33.66905734418818%2C-117.73574196690696",
  portolaChinon: "33.67424716551163%2C-117.71482275547011",
  portolaCadence: "33.67257862990563%2C-117.71576210656995",
  portolaMerit: "33.670865494647906%2C-117.71242756986437",
  busStaging: "33.66811163961207%2C-117.76805627347623",
  waypoint: "33.69166722737075%2C-117.76647333982905",
};

const instructions: ParkingInstructionTypes = {
  freewayToLot0: {
    accordionTitle: "Lot 0",
    description: "200 meter walk (2 min) to finish line",
    location: locations.lot0,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 0",
  },
  freewayToLot1: {
    accordionTitle: "Lot 1",
    description: "150 meter walk (1 min) to finish line",
    location: locations.lot1,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 1",
  },
  freewayToLot2: {
    accordionTitle: "Lot 2",
    description: "250 meter walk (3 min) to finish line",
    location: locations.lot2,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 2",
  },
  freewayToLot3: {
    accordionTitle: "Lot 3",
    description: "300 meter walk (5 min) to finish line",
    location: locations.lot3,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 3",
  },
  freewayToLot4: {
    accordionTitle: "Lot 4",
    description: "800 meter walk (9 min) to finish line",
    location: locations.lot4,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 4",
  },
  freewayToLot5: {
    accordionTitle: "Lot 5",
    description: "1500 meter walk (12 min) to finish line",
    location: locations.lot5,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 5",
  },
  freewayToLot6: {
    accordionTitle: "Lot 6",
    description: "800 meter walk (8 min) to finish line",
    location: locations.lot6,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 6",
  },
  freewayToLot7: {
    accordionTitle: "Lot 7",
    description: "600 meter walk (5 min) to finish line",
    location: locations.lot7,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 7",
  },
  freewayToLot8: {
    accordionTitle: "Lot 8 (Wild Rivers)",
    description: "1600 meter walk (14 min) to finish line",
    location: locations.lot8,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Lot 8 (Wild Rivers)",
  },
  freewayToPortolaEntrance1: {
    description: "Entrance 1 - Off Chinon (west side of school)",
    location: locations.portolaChinon,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Portola Entrance 1",
  },
  freewayToPortolaEntrance2: {
    description: "Entrance 2 - Off Cadence",
    location: locations.portolaCadence,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Portola Entrance 2",
  },
  freewayToPortolaEntrance3: {
    description: "Entrance 3 - Off Merit (east side by stadium)",
    location: locations.portolaMerit,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to Portola Entrance 3",
  },
  freewayToRunnerDropoffAndPickup: {
    description: "Runner dropoff and pickup (Lot 4)",
    location: locations.lot4,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to runner dropoff and pickup (Lot 4)",
  },
  freewayToTeamDropoff: {
    description: "Team dropoff (Lot 1)",
    location: locations.lot1,
    includeWaypoint: true,
    modalLinkLabel: "freeway",
    modalTitle: "Freeway to team dropoff (Lot 1)",
  },
  teamDropoffToBusStagingArea: {
    description: "Bus staging area",
    location: locations.busStaging,
    includeWaypoint: false,
    modalLinkLabel: "team dropoff",
    modalTitle: "Team dropoff to bus staging area",
  },
  busStagingAreaToTeamPickup: {
    description: "Team pickup (Lot 1)",
    location: locations.lot1,
    includeWaypoint: false,
    modalLinkLabel: "bus staging area",
    modalTitle: "Bus staging area to team pickup (Lot 1)",
  },
};

const instructionSections = {
  spectators: "Spectators",
  runnerDropoffAndPickup: "Runner dropoff and pickup",
  buses: "Buses",
};

function InstructionModal({
  isOpen,
  onOpenChange,
  instruction,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  instruction: ParkingInstructionType;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      placement="top"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{instruction.modalTitle}</ModalHeader>
        <ModalBody>
          <ModalBodyInternal instruction={instruction} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function getMainAccordionItem(instructionSection: string, child: ReactNode) {
  return (
    <AccordionItem
      key={instructionSection}
      aria-label={instructionSection}
      title={instructionSection}
      classNames={{
        title: getParagraphStyle(true),
      }}
    >
      {child}
    </AccordionItem>
  );
}

function getSpectatorsAccordionItem(
  handleOpenModal: (instruction: ParkingInstructionType) => void,
) {
  return (
    <>
      <p>
        All vehicles (including school vans) will park in Lots 0, 2 through 7, or Portola High
        School (shuttle service available).
      </p>

      <Accordion>
        {getSpectatorLotAccordionItem(instructions.freewayToLot0, handleOpenModal)}
        {/*getSpectatorLotAccordionItem(instructions.freewayToLot1, handleOpenModal)*/}
        {getSpectatorLotAccordionItem(instructions.freewayToLot2, handleOpenModal)}
        {getSpectatorLotAccordionItem(instructions.freewayToLot3, handleOpenModal)}
        {getSpectatorLotAccordionItem(instructions.freewayToLot4, handleOpenModal)}
        {getSpectatorLotAccordionItem(instructions.freewayToLot5, handleOpenModal)}
        {getSpectatorLotAccordionItem(instructions.freewayToLot6, handleOpenModal)}
        {getSpectatorLotAccordionItem(instructions.freewayToLot7, handleOpenModal)}
        {/*getSpectatorLotAccordionItem(instructions.freewayToLot8, handleOpenModal)*/}
        <AccordionItem
          key="Portola High School"
          aria-label="Portola High School"
          title="Portola High School"
        >
          <div className="space-y-4 pl-6">
            <p>
              Shuttles leave Portola every 10 minutes from the Cadence lot and drop off at the Great
              Park in Lot 4.
            </p>
            <p>There are 3 parking entrance options:</p>{" "}
            <DescriptionMapModalInDiv
              instruction={instructions.freewayToPortolaEntrance1}
              handleOpenModal={handleOpenModal}
            />
            <DescriptionMapModalInDiv
              instruction={instructions.freewayToPortolaEntrance2}
              handleOpenModal={handleOpenModal}
            />
            <DescriptionMapModalInDiv
              instruction={instructions.freewayToPortolaEntrance3}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function getRunnerDropoffAndPickupAccordionItem(
  handleOpenModal: (instruction: ParkingInstructionType) => void,
) {
  return (
    <DescriptionMapModalInDiv
      instruction={instructions.freewayToRunnerDropoffAndPickup}
      handleOpenModal={handleOpenModal}
    />
  );
}

function getBusesAccordionItem(handleOpenModal: (instruction: ParkingInstructionType) => void) {
  return (
    <div className="space-y-4">
      <p>
        Drop off and pick up teams in Lot 1 on Phantom. Coordinate pickup via phone call when your
        team is ready to leave.
      </p>
      <DescriptionMapModalInDiv
        instruction={instructions.freewayToTeamDropoff}
        handleOpenModal={handleOpenModal}
      />
      <DescriptionMapModalInDiv
        instruction={instructions.teamDropoffToBusStagingArea}
        handleOpenModal={handleOpenModal}
      />
      <DescriptionMapModalInDiv
        instruction={instructions.busStagingAreaToTeamPickup}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}

function Instructions({
  handleOpenModal,
}: {
  handleOpenModal: (instruction: ParkingInstructionType) => void;
}) {
  return (
    <div className="w-[768px] max-w-full basis-1/2 pl-6">
      <Accordion>
        {/* Must call get*AccordionItem as functions rather than nesting JSX components due to HeroUI limitation: https://github.com/heroui-inc/heroui/issues/2381 */}
        {getMainAccordionItem(
          instructionSections.spectators,
          getSpectatorsAccordionItem(handleOpenModal),
        )}
        {getMainAccordionItem(
          instructionSections.runnerDropoffAndPickup,
          getRunnerDropoffAndPickupAccordionItem(handleOpenModal),
        )}
        {getMainAccordionItem(instructionSections.buses, getBusesAccordionItem(handleOpenModal))}
      </Accordion>
    </div>
  );
}

function InstructionsSection({
  handleOpenModal,
}: {
  handleOpenModal: (instruction: ParkingInstructionType) => void;
}) {
  return (
    <>
      <h1 className={clsx("pt-6", getSubheaderStyle())}>Directions</h1>
      <div className="flex flex-col items-center justify-start gap-x-10 gap-y-8 lg:flex-row lg:items-start">
        <Instructions handleOpenModal={handleOpenModal} />
        <GreatParkParkingLots />
      </div>
    </>
  );
}

function MapLink({ location, includeWaypoint }: { location: string; includeWaypoint: boolean }) {
  return (
    <div>
      <Link
        isExternal
        aria-label="Google Maps"
        href={
          `https://www.google.com/maps/dir/?api=1&destination=${location}` +
          (includeWaypoint ? `&waypoints=${locations.waypoint}` : "")
        }
      >
        Google Maps
      </Link>
      {includeWaypoint && (
        <p className="inline">
          {" "}
          (when getting to the intermediate waypoint on Jeffrey, click CONTINUE to continue to the
          Great Park, as explained above in red)
        </p>
      )}
    </div>
  );
}

function ModalLink({
  instruction,
  handleOpenModal,
}: {
  instruction: ParkingInstructionType;
  handleOpenModal: (instruction: ParkingInstructionType) => void;
}) {
  return (
    <p
      onClick={() => handleOpenModal(instruction)}
      className="cursor-pointer text-base text-primary transition-opacity tap-highlight-transparent hover:opacity-hover active:opacity-disabled data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
    >
      Turn by turn instructions from {instruction.modalLinkLabel}
    </p>
  );
}

function DescriptionMapModalInDiv({
  instruction,
  handleOpenModal,
}: {
  instruction: ParkingInstructionType;
  handleOpenModal: (instruction: ParkingInstructionType) => void;
}) {
  return (
    <div className="space-y-1">
      <p>{instruction.description}</p>
      <MapLink location={instruction.location} includeWaypoint={instruction.includeWaypoint} />
      <ModalLink instruction={instruction} handleOpenModal={handleOpenModal} />
    </div>
  );
}

function getSpectatorLotAccordionItem(
  instruction: ParkingInstructionType,
  handleOpenModal: (instruction: ParkingInstructionType) => void,
) {
  return (
    <AccordionItem
      key={instruction.accordionTitle}
      aria-label={instruction.accordionTitle}
      title={instruction.accordionTitle}
    >
      <DescriptionMapModalInDiv instruction={instruction} handleOpenModal={handleOpenModal} />
    </AccordionItem>
  );
}

function ModalBodyList({ start, children }: { start?: number; children: ReactNode }) {
  return (
    <ol start={start ?? 1} className="list-outside list-decimal space-y-4 pl-4">
      {children}
    </ol>
  );
}

function ModalBodyInternal({ instruction }: { instruction: ParkingInstructionType }): ReactNode {
  return instruction === instructions.freewayToLot0 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Phantom</li>
      <li>Left into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot1 ||
    instruction === instructions.freewayToTeamDropoff ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Phantom</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot2 ? (
    <>
      <ModalBodyList>
        <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
        <li>North on Jeffrey</li>
        <li>Right on Trabuco</li>
        <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
        <li>Right on Ridge Valley</li>
      </ModalBodyList>
      <p className="pt-4">There are 2 possible entrances:</p>
      <ModalBodyList start={6}>
        <li>Left on Hornet</li>
        <li>Right into lot</li>
      </ModalBodyList>
      <p>[or]</p>
      <ModalBodyList start={6}>
        <li>Left on Corsair</li>
        <li>Left at roundabout onto Phantom</li>
        <li>Right into lot</li>
      </ModalBodyList>
    </>
  ) : instruction === instructions.freewayToLot3 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Beacon</li>
      <li>Right on Bosque</li>
      <li>Straight across roundabout at Hornet to stay on Bosque</li>
      <li>First left</li>
      <li>Pass Hornet</li>
      <li>Follow signs to Lot 3 and soccer stadium</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot4 ||
    instruction === instructions.freewayToRunnerDropoffAndPickup ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot5 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right at roundabout onto Skyhawk</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot6 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right at roundabout onto Skyhawk</li>
      <li>Right on Marine Way</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot7 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right at roundabout onto Skyhawk</li>
      <li>Right on Marine Way</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToLot8 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right at roundabout onto Skyhawk</li>
      <li>Left into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToPortolaEntrance1 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Left at roundabout onto Bosque</li>
      <li>Right on Cadence</li>
      <li>Straight across roundabout at Pusan to stay on Cadence</li>
      <li>Left on Chinon</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToPortolaEntrance2 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Left at roundabout onto Bosque</li>
      <li>Right on Cadence</li>
      <li>Straight across roundabout at Pusan to stay on Cadence</li>
      <li>Pass Chinon to stay on Cadence</li>
      <li>Left into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.freewayToPortolaEntrance3 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Left at roundabout onto Bosque</li>
      <li>Right on Cadence</li>
      <li>Straight across roundabout at Pusan to stay on Cadence</li>
      <li>Pass Chinon to stay on Cadence</li>
      <li>Left on Merit</li>
      <li>Left into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.busStagingAreaToTeamPickup ? (
    <ModalBodyList>
      <li>Exit staging area on Valley Oak and turn right</li>
      <li>Right on Irvine Center Drive</li>
      <li>Left on Sand Canyon</li>
      <li>Right on Marine Way</li>
      <li>Left on Ridge Valley</li>
      <li>Right on Phantom</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : instruction === instructions.teamDropoffToBusStagingArea ? (
    <ModalBodyList>
      <li>Exit Lot 1 on Phantom and turn left</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Great Park Blvd</li>
      <li>Left on Sand Canyon</li>
      <li>Drive to Waterworks and turn right into lot</li>
      <li>Follow signs to staging area</li>
    </ModalBodyList>
  ) : (
    <></>
  );
}

function Alerts() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-6">
      <div>
        <Alert
          hideIconWrapper
          color="danger"
          title={
            <div className="flex flex-col justify-start gap-x-10 gap-y-4 lg:flex-row">
              <div className="space-y-2 lg:basis-3/5">
                <p>
                  <span className="font-extrabold">DO NOT</span> exit Interstate 5 or 405 at Sand
                  Canyon. You will hit 30-min gridlock. You must exit Jeffrey, instead.
                </p>
                <p>
                  Use the Google Maps links below. They force you through Jeffrey by including an{" "}
                  <span className="font-bold">intermediate waypoint</span>. When getting to the
                  waypoint, click CONTINUE in Google Maps to continue to the Great Park.
                </p>
              </div>
              <div className="relative aspect-3741/3614 max-h-56 w-full max-w-56 lg:basis-2/5">
                <Image
                  fill
                  src={directionsGridlock}
                  quality={100}
                  placeholder="blur"
                  alt="Directions Gridlock"
                  className="rounded-lg border border-slate-300 object-contain shadow-lg"
                />
              </div>
            </div>
          }
          variant="faded"
          radius="sm"
          classNames={{ title: "text-medium font-normal" }}
        />
      </div>
      <div>
        <Alert
          hideIconWrapper
          color="primary"
          title={
            <div className="space-y-2">
              <p>
                Parking passes <span className="font-bold">must be purchased online</span> prior to
                arriving at the {siteConfig.greatPark}. No parking passes will be sold onsite.
              </p>
              {new Date() < dates.parkingPassPurchaseDate.date && (
                <p>
                  Passes will be available for purchase on this page starting{" "}
                  <span className="font-semibold">
                    {dates.parkingPassPurchaseDate.monthDayLong}
                  </span>
                  .
                </p>
              )}
            </div>
          }
          variant="faded"
          radius="sm"
          classNames={{ title: "text-medium font-normal" }}
        />
      </div>
    </div>
  );
}

function GreatParkParkingLots() {
  return (
    <div className="w-full basis-1/2">
      <div className="max-h-2xl relative mx-auto aspect-1357/957 w-full max-w-2xl lg:mx-0">
        <Image
          fill
          src={greatParkParkingLots}
          quality={100}
          placeholder="blur"
          alt="Great Park Parking Lots"
          className="rounded-lg object-contain shadow-lg"
        />
      </div>
    </div>
  );
}

function ParkingLink({ isStartDate }: { isStartDate: boolean }) {
  return (
    <Button
      isExternal
      as={Link}
      color={isStartDate ? "primary" : "secondary"}
      radius="full"
      variant="ghost"
      href={isStartDate ? urls.parkingPasses.startDate : urls.parkingPasses.endDate}
    >
      Purchase{" "}
      {isStartDate
        ? dates.meetStartDateParts.dayDescriptionLong
        : dates.meetEndDateParts.dayDescriptionLong}
    </Button>
  );
}

function ParkingPasses() {
  return (
    <>
      <h1 className={clsx("pt-6", getSubheaderStyle())}>Parking Passes</h1>
      <p className="pl-6">
        All vehicles (including school vans) must purchase a $20 parking pass online.
      </p>
      <div className="flex justify-center gap-6 pt-2 sm:justify-start sm:pl-6">
        <ParkingLink isStartDate={true} />
        <ParkingLink isStartDate={false} />
      </div>
    </>
  );
}

export default function ParkingAndDirections() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [instruction, setInstruction] = useState<ParkingInstructionType | undefined>();

  function handleOpenModal(instruction: ParkingInstructionType) {
    setInstruction(() => instruction);
    onOpen();
  }

  return (
    <>
      {instruction && (
        <InstructionModal isOpen={isOpen} onOpenChange={onOpenChange} instruction={instruction} />
      )}
      <Alerts />
      <ParkingPasses />
      <InstructionsSection handleOpenModal={handleOpenModal} />
    </>
  );
}
