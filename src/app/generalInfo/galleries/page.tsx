import { LinkType } from "@/types";
import { Link } from "@heroui/link";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.galleries.menuLabel,
};

function Year({ year, links }: { year: string; links: LinkType[] }) {
  return (
    <div>
      <div>{year}</div>
      <div className="ml-4">
        {links.map((link) => (
          <div key={link.url}>
            <Link isExternal href={link.url}>
              {link.description}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Past <span className="font-bold">Galleries</span>
      </h1>
      <div className="flex pt-10">
        <div className="basis-1/2 space-y-4">
          <div className="text-lg font-light tracking-tighter sm:text-xl">VIDEOS</div>
          <Year
            year="2022"
            links={[
              {
                url: "https://www.youtube.com/watch?v=bfa_3brpAFg",
                description: "Boys Sweepstakes from hdRunners",
              },
              {
                url: "https://www.youtube.com/watch?v=637SrwMy968",
                description: "Girls Sweepstakes from hdRunners",
              },
              {
                url: "https://www.youtube.com/watch?v=wyuxPyDiGwk2",
                description: "Sweepstakes highlights and interviews from hdRunners",
              },
              {
                url: "https://www.youtube.com/playlist?list=PLdu8FPnv0gNennF9By8ehfw3WQbWprmGl",
                description: "Various races from hdRunners",
              },
            ]}
          />
          <Year
            year="2021"
            links={[
              {
                url: "https://www.youtube.com/watch?v=H_E7dNHkj0o",
                description: "Boys Sweepstakes from hdRunners",
              },
              {
                url: "https://www.youtube.com/watch?v=PjHDvnDH_No",
                description: "Girls Sweepstakes from hdRunners",
              },
            ]}
          />
          <Year
            year="2019"
            links={[
              {
                url: "https://www.youtube.com/watch?v=Usd8qx89fsE",
                description: "Historic Newbury Park vs Great Oak from hdRunners",
              },
            ]}
          />
          <Year
            year="2018"
            links={[
              {
                url: "https://www.youtube.com/playlist?list=PLdu8FPnv0gNdbXK2pjcN5gtEkTIVJ2v-r",
                description: "Various races from hdRunners",
              },
              {
                url: "https://ca.milesplit.com/meets/323909/videos#.W6wEDPZFzDc",
                description: "Various races and interviews from MileSplit",
              },
            ]}
          />
          <Year
            year="2017"
            links={[
              {
                url: "https://ca.milesplit.com/meets/284768/videos#.WcKZq7pFzDc",
                description: "Various races and interviews from MileSplit",
              },
            ]}
          />
          <Year
            year="2016"
            links={[
              {
                url: "https://ca.milesplit.com/meets/242966/videos#.V99WRI-cHDc",
                description: "Various races and interviews from MileSplit",
              },
            ]}
          />
          <Year
            year="2015"
            links={[
              {
                url: "https://www.youtube.com/watch?feature=youtu.be&v=auAoScNH_DY&app=desktop",
                description: "Highlights from Indian Springs XC",
              },
            ]}
          />
          <Year
            year="2014"
            links={[
              {
                url: "https://www.runnerspace.com/eprofile.php?do=videos&plus=1&event_id=361&year=2014",
                description: "Various races and interviews from RunnerSpace",
              },
            ]}
          />
          <Year
            year="2013"
            links={[
              {
                url: "https://www.prepcaltrack.com/2013/09/21/friday-woodbridge/",
                description: "Sweepstakes and interviews from Steve Brouwer of PrepCalTrack",
              },
            ]}
          />
        </div>
        <div className="basis-1/2 space-y-4">
          <div className="text-lg font-light tracking-tighter sm:text-xl">PHOTOS</div>
          <Year
            year="2018"
            links={[
              {
                url: "https://www.prepcaltrack.com/2018/09/20/gene-leon-guerreros-saturday-day-2-pix-from-woodbridge/",
                description: "Saturday from Gene Leon-Guerrero of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2018/09/20/friday-night-woodbridge-pix-by-gene-leon-guerrero/",
                description: "Friday from Gene Leon-Guerrero of PrepCalTrack",
              },
            ]}
          />
          <Year
            year="2017"
            links={[
              {
                url: "//www.prepcaltrack.com/2017/09/18/woodbridge-saturday-pix-by-gene-leon-guerrero/",
                description: "Saturday from Gene Leon-Guerrero of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2017/09/18/woodbridge-friday-photos-by-gene-leon-guerrero/",
                description: "Friday from Gene Leon-Guerrero of PrepCalTrack",
              },
            ]}
          />
          <Year
            year="2016"
            links={[
              {
                url: "https://www.prepcaltrack.com/2016/09/19/saturdays-pix-from-woodbridge-by-gene-leon-guerrero/",
                description: "Saturday from Gene Leon-Guerrero of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2016/09/19/friday-woodbridge-photos-by-gene-lg/",
                description: "Friday from Gene Leon-Guerrero of PrepCalTrack",
              },
              {
                url: "https://ca.milesplit.com/photos/albums/32272",
                description: "MileSplit",
              },
            ]}
          />
          <Year
            year="2015"
            links={[
              {
                url: "https://www.prepcaltrack.com/2015/09/19/woodbridge-friday-album-by-duncan-selby/",
                description: "Friday from Duncan Selby of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2015/09/21/more-woodbridge-invite-photos-from-duncan-selby/",
                description: "More from Duncan Selby of PrepCalTrack",
              },
            ]}
          />
          <Year
            year="2014"
            links={[
              {
                url: "https://www.prepcaltrack.com/2014/09/22/sherri-cortezs-saturday-woodbridge-photos/",
                description: "Saturday from Sherri Cortez of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2014/09/21/duncan-selbys-saturday-woodbridge-photos/",
                description: "Saturday from Duncan Selby of PrepCalTrack",
              },
              {
                url: "https://www.prepcaltrack.com/2014/09/21/dean-lofgrens-saturday-woodbridge-photos/",
                description: "Saturday from Dean Lofgren of PrepCalTrack ",
              },
              {
                url: "https://www.prepcaltrack.com/2014/09/20/duncan-selbys-friday-night-woodbridge-album/",
                description: "Friday from Duncan Selby of PrepCalTrack",
              },
              {
                url: "https://www.facebook.com/media/set/?set=a.709052612497167.1073741998.170525689683198&type=1",
                description: "Day 1 from Woodbridge Facebook",
              },
              {
                url: "https://www.facebook.com/media/set/?set=a.709698982432530.1073741999.170525689683198&type=1",
                description: "Day 2 from Woodbridge Facebook",
              },
              {
                url: "https://www.facebook.com/media/set/?set=a.709829852419443.1073742000.170525689683198&type=1",
                description: "More Day 2 from Woodbridge Facebook",
              },
            ]}
          />
          <Year
            year="2013"
            links={[
              {
                url: "https://www.facebook.com/media/set/?set=a.543897979012632.1073741902.170525689683198&type=3",
                description: "Woodbridge Facebook",
              },
              {
                url: "https://cross-country-classic.runnerspace.com/eprofile.php?event_id=361&do=photos&year=2013",
                description: "Various from Donal Pearce of RunnerSpace",
              },
            ]}
          />
          <Year
            year="2012"
            links={[
              {
                url: "https://www.facebook.com/media/set/?set=a.390882317647533.82337.170525689683198&type=1",
                description: "Woodbridge Facebook",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
