import { dates } from "@/config/dates";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import List from "@/components/list";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: pages.entryFees.menuLabel,
};

function Subheader({ padTop, children }: { padTop?: boolean; children: ReactNode }) {
  return <h1 className={clsx(padTop && "pt-4", getSubheaderStyle())}>{children}</h1>;
}

function Total({ children }: { children: ReactNode }) {
  return <div className="overline decoration-gray-200">{children}</div>;
}

const combinedTypes = {
  first: "first",
  last: "last",
  middle: "middle",
};

function CombinedTDFirst({ isFee, children }: { isFee?: boolean; children?: ReactNode }) {
  return (
    <TD isFee={isFee} combinedType={combinedTypes.first}>
      {children}
    </TD>
  );
}

function CombinedTDLast({ isFee, children }: { isFee?: boolean; children?: ReactNode }) {
  return (
    <TD isFee={isFee} combinedType={combinedTypes.last}>
      {children}
    </TD>
  );
}

function CombinedTDMiddle({ isFee, children }: { isFee?: boolean; children?: ReactNode }) {
  return (
    <TD isFee={isFee} combinedType={combinedTypes.middle}>
      {children}
    </TD>
  );
}

function TD({
  combinedType,
  isFee,
  children,
}: {
  combinedType?: string;
  isFee?: boolean;
  children?: ReactNode;
}) {
  const border_y =
    combinedType === combinedTypes.first
      ? "border-t"
      : combinedType === combinedTypes.last
        ? "border-b"
        : combinedType === combinedTypes.middle
          ? null
          : "border-y";

  const padding_y =
    combinedType === combinedTypes.first
      ? "pt-2"
      : combinedType === combinedTypes.last
        ? "pb-2"
        : combinedType === combinedTypes.middle
          ? "py-0"
          : "py-2";

  return (
    <td
      className={clsx(
        "border-x pr-2 font-light sm:pr-4",
        border_y,
        padding_y,
        isFee && "text-right",
        isFee ? "pl-2 sm:pl-4" : "pl-6 -indent-4 sm:pl-8",
      )}
    >
      {children}
    </td>
  );
}

function TH({ isFee, children }: { isFee?: boolean; children: ReactNode }) {
  return (
    <th
      className={clsx("border px-2 py-2 text-left font-normal sm:px-4", isFee && "w-2/5 sm:w-fit")}
    >
      {children}
    </th>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        Entry <span className="font-bold">Fees</span>
      </PageHeader>
      <div className="space-y-4 pt-10">
        <Subheader>Formula</Subheader>
        <div className={clsx("space-y-4", getParagraphStyle())}>
          <List isOrdered={true}>
            <li>
              $20 per runner for the first 14 runners registered ($50 minimum) PLUS $15 per
              remaining runner for a maximum of $700.
            </li>
            <li>
              $70 each for second (B) and third (C) Varsity teams entered in the meet. This option
              is only available to schools that have earned a spot in the Sweepstakes and/or Rated
              races and want to run their B or C teams in a Varsity race instead of the grade level
              races.
            </li>
          </List>
        </div>
        <div className="py-4 sm:pl-5">
          <table className="table-fixed overflow-hidden rounded-xl bg-content1 shadow-lg">
            <thead>
              <tr>
                <TH>Example</TH>
                <TH isFee={true}>Entry Fee</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD>1 runner</TD>
                <TD isFee={true}>$50</TD>
              </tr>
              <tr>
                <TD>12 runners</TD>
                <TD isFee={true}>
                  <div className="flex flex-col">
                    <div>12 x $20</div>
                    <Total>Total: $240</Total>
                  </div>
                </TD>
              </tr>
              <tr>
                <TD>29 runners</TD>
                <TD isFee={true}>
                  <div className="flex flex-col">
                    <div>14 x $20</div>
                    <div>+ 15 x $15</div>
                    <Total>Total: $505</Total>
                  </div>
                </TD>
              </tr>
              <tr>
                <TD>49 runners</TD>
                <TD isFee={true}>
                  <div className="flex flex-col">
                    <div>14 x $20</div>
                    <div>+ 35 x $15</div>
                    <Total>
                      Total: <span className="line-through">$805</span> $700
                    </Total>
                  </div>
                </TD>
              </tr>

              <tr>
                <CombinedTDFirst>49 runners</CombinedTDFirst>
                <CombinedTDFirst isFee={true}>$700</CombinedTDFirst>
              </tr>
              <tr>
                <CombinedTDMiddle>Boys A team in Sweepstakes race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}></CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDLast>No Boys B team in Rated or Varsity race</CombinedTDLast>
                <CombinedTDLast isFee={true}></CombinedTDLast>
              </tr>

              <tr>
                <CombinedTDFirst>49 runners</CombinedTDFirst>
                <CombinedTDFirst isFee={true}>$700</CombinedTDFirst>
              </tr>
              <tr>
                <CombinedTDMiddle>Boys A team in Sweepstakes race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}></CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDMiddle>Boys B team in Rated race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}>+ $70</CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDMiddle>Boys C team in Varsity race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}>+ $70</CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDMiddle>Girls A team in Rated race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}></CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDMiddle>Girls B team in Varsity race</CombinedTDMiddle>
                <CombinedTDMiddle isFee={true}>+ $70</CombinedTDMiddle>
              </tr>
              <tr>
                <CombinedTDLast></CombinedTDLast>
                <CombinedTDLast isFee={true}>
                  <Total>Total: $910</Total>
                </CombinedTDLast>
              </tr>
            </tbody>
          </table>
        </div>
        <Subheader padTop={true}>Payment options</Subheader>
        <div className={clsx("space-y-4", getParagraphStyle())}>
          <List isOrdered={true}>
            <li>Credit card through {siteConfig.athleticNet}</li>
            <li>
              Check (school or personal) mailed by {dates.entryFeeMailDateParts.monthDayLong} so
              that we have it by race day
            </li>
            <li>Check (school or personal) brought to the meet on race day</li>
            <li>Cash or money order</li>
          </List>
        </div>
        <Subheader padTop={true}>Important Notes</Subheader>
        <div className={clsx("space-y-4", getParagraphStyle())}>
          <List isOrdered={false}>
            <li>
              Every school needs to register a credit card with {siteConfig.athleticNet} regardless
              of how the fees will be paid
            </li>
            <li>
              The Entry Fee is due on race day. If payment is not received by then, we will
              automatically charge your card on{" "}
              {dates.entryFeeAutoDebitDateParts.dayDescriptionMonthDayYearLong} at 8:00 AM. No
              refunds on credit card payments.
            </li>
            <li>Make the check payable to {siteConfig.woodbridgeHighSchoolCrossCountry}</li>
            <li>
              If you are planning to mail the entry fee, mail to...
              <div className="mt-4 pl-10">
                <p>
                  Attn: Cross Country Classic
                  <br />
                  {siteConfig.woodbridge} High School
                  <br />
                  2 Meadowbrook
                  <br />
                  Irvine, CA 92604
                </p>
              </div>
            </li>
          </List>
        </div>
      </div>
    </>
  );
}
