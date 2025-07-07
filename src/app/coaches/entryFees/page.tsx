import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pages.entryFees.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Entry <span className="font-bold">Fees</span>
      </h1>
      <div className={clsx("space-y-4 pt-10 text-lg font-light sm:text-xl", fontSerif.className)}>
        <div className="space-y-4">
          <p>Entry fees are as follows:</p>
          <ol className="list-outside list-decimal space-y-4 px-10">
            <li>
              $20.00 per runner for the first 14 runners registered ($50.00 minimum) PLUS $13.00 per
              runner for runners 15 through 40 registered. Maximum Fee is $618.00.
            </li>
            <li>No additional Fee for registering more than 40 runners. Maximum Fee is $618.00.</li>
            <li>
              $70.00 each for second and third (B and/or C) varsity teams entered in the meet. This
              option is only available to schools that have earned a spot in the Sweepstakes and/or
              Rated races and want to run their B or C teams in a varsity race instead of the
              grade-level races.
            </li>
          </ol>
        </div>
        <div className="space-y-4">
          <p>Examples:</p>
          <ul className="list-outside list-disc space-y-4 px-10">
            <li>You registered 1 runner to the meet… Your Entry Fee is $50.00.</li>
            <li>You registered 12 runners to the meet… Your Entry Fee is $20 x 12 = $240.00.</li>
            <li>
              You registered a total of 29 runners… Your Entry fee is ($20 x 14) + ($13 x 15) =
              $475.00.
            </li>
            <li>
              You registered a total of 49 runners… Your Entry fee is ($20 x 14) + ($13 x 26) =
              $618.00.
            </li>
            <li>
              You registered 55 runners and entered your Varsity team for Boys and/or Girls in
              either the Sweepstakes or Rated race… Your Entry Fee is $618.00.
            </li>
            <li>
              You registered 55 runners, entered a Boys Varsity team in the Boys Sweepstakes race
              and a Girls Varsity team in the Girls Rated race… and also entered a Boys Varsity B
              team in the Boys Rated race ($70), a Boys Varsity C team in the Boys division Varsity
              race ($70), and a Girls B team in the Girls division Varsity race ($70)… Your Entry
              Fee is $828.00 ($618 + $70 + $70 +$70).
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p>Payment options:</p>
          <ol className="list-outside list-decimal space-y-4 px-10">
            <li>Credit card through {siteConfig.athleticNet}.</li>
            <li>
              School check or personal check (make the check payable to{" "}
              {siteConfig.woodbridgeHighSchoolCrossCountry}).
            </li>
            <li>Cash or money order.</li>
          </ol>
        </div>
        <div className="space-y-4">
          <p>Important notes:</p>
          <ul className="list-outside list-disc space-y-4 px-10">
            <li>
              Every School needs to register a credit card with {siteConfig.athleticNet} regardless
              of how the fees will be paid.
            </li>
            <li>
              The Entry Fee is due by the day of the meet. If payment is not received by then, we
              will automatically charge your card on{" "}
              {dates.entryFeeAutoDebitDateParts.dayDescriptionMonthDayYearLong} at 8:00 AM. No
              refunds on credit card payments.
            </li>
            <li>
              If you are planning to mail the entry fee:
              <div className="mt-4 space-y-4 px-10">
                <p>
                  Please mail it by {dates.entryFeeMailDateParts.monthDayLong} so that we have it by
                  race day.
                </p>
                <p>Mail to...</p>
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
          </ul>
        </div>
      </div>
    </>
  );
}
