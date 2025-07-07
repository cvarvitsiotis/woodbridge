"use client";

import greatParkParkingLots from "@/../public/great-park-parking-lots.png";
import directionsGridlock from "@/../public/woodbridge-gridlock.png";
import Image from "next/image";
import { Link } from "@heroui/link";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { urls } from "@/config/data";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { fontSerif } from "@/styles/fonts";
import { siteConfig } from "@/config/site";

const modalTitles = {
  freewayToBusDropoff: "Freeway to bus dropoff",
  stagingAreaToBusPickup: "Staging area to bus pickup",
  busDropoffToStagingArea: "Bus dropoff to staging area",
  freewayToLot0: "Freeway to Lot 0",
  freewayToLot1: "Freeway to Lot 1",
  freewayToLot2: "Freeway to Lot 2",
  freewayToLot3: "Freeway to Lot 3",
  freewayToLot4: "Freeway to Lot 4",
  freewayToLot5: "Freeway to Lot 5",
  freewayToLot6: "Freeway to Lot 6",
  freewayToLot7: "Freeway to Lot 7",
  freewayToLot8: "Freeway to Lot 8 (Wild Rivers)",
  freewayToPortolaEntrance1: "Freeway to Portola Entrance 1",
  freewayToPortolaEntrance2: "Freeway to Portola Entrance 2",
  freewayToPortolaEntrance3: "Freeway to Portola Entrance 3",
};

const instructionSections = {
  buses: "Buses",
  spectators: "Spectators",
  runnerDropoffAndPickup: "Runner dropoff and pickup",
};

function AppleAndGoogleLinks({
  appleUrl,
  googleUrl,
  name,
}: {
  appleUrl: string;
  googleUrl: string;
  name: string;
}) {
  return (
    <>
      <Link isExternal aria-label={`${name} Apple Maps`} href={appleUrl}>
        Apple
      </Link>{" "}
      |{" "}
      <Link isExternal aria-label={`${name} Google Maps`} href={googleUrl}>
        Google
      </Link>{" "}
      Maps
    </>
  );
}

function ModalLink({
  title,
  handleOpenModal,
}: {
  title: string;
  handleOpenModal: (title: string) => void;
}) {
  return (
    <p
      onClick={() => handleOpenModal(title)}
      className="cursor-pointer text-base text-primary transition-opacity tap-highlight-transparent hover:opacity-hover active:opacity-disabled data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
    >
      Turn by turn - {title}
    </p>
  );
}

function LotForBus1({
  appleUrl,
  googleUrl,
  name,
  modalTitle,
  handleOpenModal,
}: {
  appleUrl: string;
  googleUrl: string;
  name: string;
  modalTitle: string;
  handleOpenModal: (title: string) => void;
}) {
  return (
    <div>
      <p>{name}</p>
      <AppleAndGoogleLinks appleUrl={appleUrl} googleUrl={googleUrl} name={name} />
      <ModalLink title={modalTitle} handleOpenModal={handleOpenModal} />
    </div>
  );
}

function LotForBus2({
  appleUrl,
  googleUrl,
  name,
  modalTitle1,
  modalTitle2,
  handleOpenModal,
}: {
  appleUrl: string;
  googleUrl: string;
  name: string;
  modalTitle1: string;
  modalTitle2: string;
  handleOpenModal: (title: string) => void;
}) {
  return (
    <div>
      <p>{name}</p>
      <AppleAndGoogleLinks appleUrl={appleUrl} googleUrl={googleUrl} name={name} />
      <ModalLink title={modalTitle1} handleOpenModal={handleOpenModal} />
      <ModalLink title={modalTitle2} handleOpenModal={handleOpenModal} />
    </div>
  );
}

function PortolaLot({
  appleUrl,
  googleUrl,
  name,
  description,
  handleOpenModal,
}: {
  appleUrl: string;
  googleUrl: string;
  name: string;
  description: string;
  handleOpenModal: (title: string) => void;
}) {
  return (
    <div>
      <p>{description}</p>
      <AppleAndGoogleLinks appleUrl={appleUrl} googleUrl={googleUrl} name={name} />
      <ModalLink title={name} handleOpenModal={handleOpenModal} />
    </div>
  );
}

function getLot(
  appleUrl: string,
  googleUrl: string,
  title: string,
  name: string,
  description: string,
  handleOpenModal: (title: string) => void,
) {
  return (
    <AccordionItem key={title} aria-label={title} title={title}>
      <p>{description}</p>
      <AppleAndGoogleLinks appleUrl={appleUrl} googleUrl={googleUrl} name={name} />
      <ModalLink title={name} handleOpenModal={handleOpenModal} />
    </AccordionItem>
  );
}

function ModalBodyList({ start, children }: { start?: number; children: React.ReactNode }) {
  return (
    <ol start={start ?? 1} className="list-outside list-decimal space-y-4 px-4">
      {children}
    </ol>
  );
}

function ModalBodyInternal({ modalTitle }: { modalTitle: string }): ReactNode {
  return modalTitle === modalTitles.freewayToBusDropoff ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Phantom</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.stagingAreaToBusPickup ? (
    <ModalBodyList>
      <li>Exit staging area on Valley Oak and turn right</li>
      <li>Right on Irvine Center Drive</li>
      <li>Left on Sand Canyon</li>
      <li>Right on Marine Way</li>
      <li>Left on Ridge Valley</li>
      <li>Right on Phantom</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.busDropoffToStagingArea ? (
    <ModalBodyList>
      <li>Exit Lot 1 on Phantom and turn left</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Great Park Blvd</li>
      <li>Left on Sand Canyon</li>
      <li>Drive to Waterworks and turn right into lot</li>
      <li>Follow signs to staging area</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToLot0 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Phantom</li>
      <li>Left into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToLot1 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Right on Ridge Valley</li>
      <li>Left on Phantom</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToLot2 ? (
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
  ) : modalTitle === modalTitles.freewayToLot3 ? (
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
  ) : modalTitle === modalTitles.freewayToLot4 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToLot5 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Right at roundabout onto Skyhawk</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToLot6 ? (
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
  ) : modalTitle === modalTitles.freewayToLot7 ? (
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
  ) : modalTitle === modalTitles.freewayToLot8 ? (
    <ModalBodyList>
      <li>Exit Interstate 5 or 405 at Jeffrey (not Sand Canyon!)</li>
      <li>North on Jeffrey</li>
      <li>Right on Trabuco</li>
      <li>Pass Sand Canyon where it turns into Great Park Blvd</li>
      <li>Straight across roundabout at Bosque to stay on Great Park Blvd</li>
      <li>Straight across roundabout at Skyhawk to stay on Great Park Blvd</li>
      <li>Right into lot</li>
    </ModalBodyList>
  ) : modalTitle === modalTitles.freewayToPortolaEntrance1 ? (
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
  ) : modalTitle === modalTitles.freewayToPortolaEntrance2 ? (
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
  ) : modalTitle === modalTitles.freewayToPortolaEntrance3 ? (
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
  ) : (
    <></>
  );
}

function Subtitle({ label }: { label: string }) {
  return <h1 className="text-xl font-light sm:text-2xl">{label}</h1>;
}

export default function ParkingAndDirections() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");

  function handleOpenModal(title: string) {
    setModalTitle(() => title);
    onOpen();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="top"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
          <ModalBody>
            <ModalBodyInternal modalTitle={modalTitle} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="space-y-4 pt-6">
        <Subtitle label="Critical notes" />
        <div className="flex flex-col items-center justify-start gap-x-10 gap-y-8 lg:flex-row lg:items-start">
          <ol
            className={clsx(
              "w-[768px] max-w-full basis-1/2 list-outside list-decimal space-y-4 px-10 text-lg sm:text-xl",
              fontSerif.className,
            )}
          >
            <li>
              Ingore Apple and Google Maps! DO NOT exit Interstate 5 or 405 at Sand Canyon. You will
              hit gridlock. You must exit Jeffery, instead.
            </li>
            <li>
              All parking passes must be purchased online prior to arriving at the{" "}
              {siteConfig.greatPark}. No parking passes will be sold onsite.
            </li>
          </ol>
          <div className="w-full basis-1/2">
            <div className="relative mx-auto aspect-[3741/3614] max-h-96 w-full max-w-96 lg:mx-0">
              <Image
                fill
                src={directionsGridlock}
                quality={100}
                placeholder="blur"
                alt="Gridlock Note"
                className="rounded-lg object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <Subtitle label="Instructions" />
        <div className="flex flex-col items-center justify-start gap-x-10 gap-y-8 lg:flex-row lg:items-start">
          <div className="w-[768px] max-w-full basis-1/2 px-8">
            <Accordion className="px-0">
              <AccordionItem
                key={instructionSections.buses}
                aria-label={instructionSections.buses}
                title={instructionSections.buses}
                classNames={{
                  title: clsx("text-xl", fontSerif.className),
                }}
              >
                <div className="space-y-4">
                  <p>
                    Drop off and pick up teams in Lot 1 on Phantom. Coordinate pickup via phone call
                    when your team is ready to leave.
                  </p>
                  <LotForBus2
                    appleUrl={urls.parking.lot1.apple}
                    googleUrl={urls.parking.lot1.google}
                    name="Bus dropoff and pickup (Lot 1)"
                    modalTitle1={modalTitles.freewayToBusDropoff}
                    modalTitle2={modalTitles.stagingAreaToBusPickup}
                    handleOpenModal={handleOpenModal}
                  />
                  <LotForBus1
                    appleUrl={urls.parking.busStaging.apple}
                    googleUrl={urls.parking.busStaging.google}
                    name="Bus staging area"
                    modalTitle={modalTitles.busDropoffToStagingArea}
                    handleOpenModal={handleOpenModal}
                  />
                </div>
              </AccordionItem>
              <AccordionItem
                key={instructionSections.spectators}
                aria-label={instructionSections.spectators}
                title={instructionSections.spectators}
                classNames={{
                  title: clsx("text-xl", fontSerif.className),
                }}
              >
                <p>
                  All vehicles (including school vans) will park in Lots 1 through 8 or Portola High
                  School (shuttle service available) with a $20 pass purchased online.
                </p>

                <Accordion>
                  {/* Must call getLot as function rather than nesting JSX component due to HeroUI limitation: https://github.com/heroui-inc/heroui/issues/2381 */}
                  {getLot(
                    urls.parking.lot0.apple,
                    urls.parking.lot0.google,
                    "Lot 0",
                    modalTitles.freewayToLot0,
                    "200 meter walk (2 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot1.apple,
                    urls.parking.lot1.google,
                    "Lot 1",
                    modalTitles.freewayToLot1,
                    "150 meter walk (1 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot2.apple,
                    urls.parking.lot2.google,
                    "Lot 2",
                    modalTitles.freewayToLot2,
                    "250 meter walk (3 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot3.apple,
                    urls.parking.lot3.google,
                    "Lot 3",
                    modalTitles.freewayToLot3,
                    "300 meter walk (5 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot4.apple,
                    urls.parking.lot4.google,
                    "Lot 4",
                    modalTitles.freewayToLot4,
                    "800 meter walk (9 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot5.apple,
                    urls.parking.lot5.google,
                    "Lot 5",
                    modalTitles.freewayToLot5,
                    "1500 meter walk (12 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot6.apple,
                    urls.parking.lot6.google,
                    "Lot 6",
                    modalTitles.freewayToLot6,
                    "800 meter walk (8 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot7.apple,
                    urls.parking.lot7.google,
                    "Lot 7",
                    modalTitles.freewayToLot7,
                    "600 meter walk (5 min) to finish line",
                    handleOpenModal,
                  )}
                  {getLot(
                    urls.parking.lot8.apple,
                    urls.parking.lot8.google,
                    "Lot 8 (Wild Rivers)",
                    modalTitles.freewayToLot8,
                    "1600 meter walk (14 min) to finish line",
                    handleOpenModal,
                  )}
                  <AccordionItem
                    key="Portola High School"
                    aria-label="Portola High School"
                    title="Portola High School"
                  >
                    <div className="space-y-4">
                      <p>Shuttles leave every 10 minutes. 3 entrance options:</p>
                      <PortolaLot
                        appleUrl={urls.parking.portolaChinon.apple}
                        googleUrl={urls.parking.portolaChinon.google}
                        name={modalTitles.freewayToPortolaEntrance1}
                        description="Entrance 1 - Off Chinon (west side of school)"
                        handleOpenModal={handleOpenModal}
                      />
                      <PortolaLot
                        appleUrl={urls.parking.portolaCadence.apple}
                        googleUrl={urls.parking.portolaCadence.google}
                        name={modalTitles.freewayToPortolaEntrance2}
                        description="Entrance 2 - Off Cadence"
                        handleOpenModal={handleOpenModal}
                      />
                      <PortolaLot
                        appleUrl={urls.parking.portolaMerit.apple}
                        googleUrl={urls.parking.portolaMerit.google}
                        name={modalTitles.freewayToPortolaEntrance3}
                        description="Entrance 3 - Off Merit (east side by stadium)"
                        handleOpenModal={handleOpenModal}
                      />
                    </div>
                  </AccordionItem>
                </Accordion>
              </AccordionItem>
              <AccordionItem
                key={instructionSections.runnerDropoffAndPickup}
                aria-label={instructionSections.runnerDropoffAndPickup}
                title={instructionSections.runnerDropoffAndPickup}
                classNames={{
                  title: clsx("text-xl", fontSerif.className),
                }}
              >
                <p>On Phantom next to Lot 1 between Ridge Valley and Corsair</p>
                <AppleAndGoogleLinks
                  appleUrl={urls.parking.runnerDropoffPickup.apple}
                  googleUrl={urls.parking.runnerDropoffPickup.google}
                  name={"Runner dropoff and pickup"}
                />
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full basis-1/2">
            <div className="max-h-2xl relative mx-auto aspect-[1357/957] w-full max-w-2xl lg:mx-0">
              <Image
                fill
                src={greatParkParkingLots}
                quality={100}
                placeholder="blur"
                alt="Great Park Parking Lots"
                className="rounded-lg object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 pt-2">
        <Subtitle label="On gridlock" />
        <div className={clsx("space-y-4 px-10 text-lg sm:text-xl", fontSerif.className)}>
          <p>
            We all know that with large athletic events, there will be traffic. However, nothing
            frustrates us more, and takes the fun out of a meet quicker, than gridlock traffic. The
            Irvine PD and our management team have devised a plan that will minimize the chances of
            this occurring (gridlock). This plan worked well last year and will work again with your
            help and cooperation. Please take the time at your Back-to-School nights, early season
            team meetings, weekly newsletters, team competitions, social activities, etc. to educate
            your team&apos;s families on the elements of this plan.
          </p>
          <p>
            We will count on each and every coach to reach out, educate and encourage each family
            member on your team, and all your friends and running enthusiasts that might attend the
            meet, to be aware and follow this plan to assure a smooth flow of the vehicles into the{" "}
            {siteConfig.greatPark}. Please give this URL to your runners and hound them to make sure
            that they take it home. Encourage them to tell their family and friends to purchase
            their parking passes ASAP, as well as to follow the driving directions provided above.
          </p>
        </div>
      </div>
    </>
  );
}
