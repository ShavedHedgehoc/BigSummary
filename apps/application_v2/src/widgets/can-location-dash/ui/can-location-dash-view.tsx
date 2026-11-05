'use client';

import { CanSmallCard } from '@/entities/can';
import { useCanLocationDash } from '../model/use-can-location-dash';
import { TApplicationTraceCanLocationDataListResponse } from '@repo/schemas';
import { LoaderCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn } from '@/shared/lib';

function MdViewLayout({ data }: { data: TApplicationTraceCanLocationDataListResponse }) {
  return (
    <div className="@container/dashboard w-full h-[calc(100vh-(--spacing(16)))]">
      <Tabs defaultValue="kolpino" className="w-full h-full flex flex-col min-h-0 px-4">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="kolpino">КЛП</TabsTrigger>
          <TabsTrigger value="piskarevka">ПСК</TabsTrigger>
          <TabsTrigger value="transit-klp-psk">КЛП-ПСК</TabsTrigger>
          <TabsTrigger value="transit-psk-klp">ПСК-КЛП</TabsTrigger>
          <TabsTrigger value="no records">?</TabsTrigger>
        </TabsList>

        <TabsContent value="kolpino" className="grow min-h-0 m-0 flex flex-col @container">
          <div className="grid grid-cols-2 @min-xs:grid-cols-4 @min-sm:grid-cols-4  @min-md:grid-cols-5 @min-xl:grid-cols-6 @min-2xl:grid-cols-8 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50 ">
            {data &&
              data.rows
                .filter((item) => item.plant === 'К' && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </TabsContent>
        <TabsContent value="piskarevka" className="grow min-h-0 m-0 flex flex-col @container">
          <div className="grid grid-cols-2 @min-xs:grid-cols-4 @min-sm:grid-cols-4  @min-md:grid-cols-5 @min-xl:grid-cols-6 @min-2xl:grid-cols-8 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50 ">
            {data &&
              data.rows
                .filter((item) => item.plant === 'П' && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </TabsContent>
        <TabsContent value="transit-klp-psk" className="grow min-h-0 m-0 flex flex-col @container">
          <div className="grid grid-cols-2 @min-xs:grid-cols-4 @min-sm:grid-cols-4  @min-md:grid-cols-5 @min-xl:grid-cols-6 @min-2xl:grid-cols-8 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50 ">
            {data &&
              data.rows
                .filter((item) => item.plant === 'К' && item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </TabsContent>
        <TabsContent value="transit-psk-klp" className="grow min-h-0 m-0 flex flex-col @container">
          <div className="grid grid-cols-2 @min-xs:grid-cols-4 @min-sm:grid-cols-4  @min-md:grid-cols-5 @min-xl:grid-cols-6 @min-2xl:grid-cols-8 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50 ">
            {data &&
              data.rows
                .filter((item) => item.plant === 'П' && item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </TabsContent>
        <TabsContent value="no records" className="grow min-h-0 m-0 flex flex-col @container">
          <div className="grid grid-cols-2 @min-xs:grid-cols-4 @min-sm:grid-cols-4  @min-md:grid-cols-5 @min-xl:grid-cols-6 @min-2xl:grid-cols-8 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50 ">
            {data &&
              data.rows
                .filter((item) => !item.plant && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function CanLocationDashView() {
  const { data, isLoading, isMobile } = useCanLocationDash();
  if (isLoading) {
    return (
      <div
        className={cn(
          'flex flex-col grow items-center justify-center h-full w-full',
          'text-muted-foreground/50 text-sm font-medium',
        )}
      >
        <LoaderCard />
      </div>
    );
  }
  if (isMobile) {
    return <div>{data && <MdViewLayout data={data} />}</div>;
  }
  return (
    <div className="@container/dashboard w-full h-[calc(100vh-(--spacing(16)))]">
      <div className="block @min-4xl/dashboard:hidden p-4">
        {data && <MdViewLayout data={data} />}
      </div>
      <div
        className="hidden @min-4xl/dashboard:grid gap-4 p-4 h-full w-full overflow-hidden"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 0.5fr',
          gridTemplateAreas: `
          "kolpino transit-klp-psk piskarevka"
          "kolpino transit-psk-klp piskarevka"
          "footer footer footer"
        `,
        }}
      >
        <div
          className="flex flex-col gap-2 border rounded-sm p-4 h-full @container"
          style={{ gridArea: 'kolpino' }}
        >
          <h2 className="text-xs font-normal text-center tracking-wide ">Колпино</h2>
          <div className="grid grid-cols-3 @min-xs:grid-cols-4  @min-sm:grid-cols-4 @min-md:grid-cols-5 @min-lg:grid-cols-6 @min-xl:grid-cols-7 @min-2xl:grid-cols-8 @min-3xl:grid-cols-9 @min-4xl:grid-cols-11 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50">
            {data &&
              data.rows
                .filter((item) => item.plant === 'К' && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </div>
        <div
          className="flex flex-col gap-2 border rounded-sm p-4 h-full @container"
          style={{ gridArea: 'transit-klp-psk' }}
        >
          <h2 className="text-xs font-normal text-center tracking-wide ">Транзит КЛП-ПСК</h2>
          <div className="grid grid-cols-3 @min-xs:grid-cols-4  @min-sm:grid-cols-4 @min-md:grid-cols-5 @min-lg:grid-cols-6 @min-xl:grid-cols-7 @min-2xl:grid-cols-8 @min-3xl:grid-cols-9 @min-4xl:grid-cols-11 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50">
            {data &&
              data.rows
                .filter((item) => item.plant === 'К' && item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </div>
        <div
          className="flex flex-col gap-2 border rounded-sm p-4 h-full @container"
          style={{ gridArea: 'transit-psk-klp' }}
        >
          <h2 className="text-xs font-normal text-center tracking-wide ">Транзит ПСК-КЛП</h2>
          <div className="grid grid-cols-3 @min-xs:grid-cols-4  @min-sm:grid-cols-4 @min-md:grid-cols-5 @min-lg:grid-cols-6 @min-xl:grid-cols-7 @min-2xl:grid-cols-8 @min-3xl:grid-cols-9 @min-4xl:grid-cols-11 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50">
            {data &&
              data.rows
                .filter((item) => item.plant === 'П' && item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </div>
        <div
          className="flex flex-col gap-2 border rounded-sm p-4 h-full @container"
          style={{ gridArea: 'piskarevka' }}
        >
          <h2 className="text-xs font-normal text-center tracking-wide ">Пискаревка</h2>
          <div className="grid grid-cols-3 @min-xs:grid-cols-4  @min-sm:grid-cols-4 @min-md:grid-cols-5 @min-lg:grid-cols-6 @min-xl:grid-cols-7 @min-2xl:grid-cols-8 @min-3xl:grid-cols-9 @min-4xl:grid-cols-11 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50">
            {data &&
              data.rows
                .filter((item) => item.plant === 'П' && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </div>
        <div
          className="flex flex-col gap-2 border rounded-sm p-4 h-full @container"
          style={{ gridArea: 'footer' }}
        >
          <h2 className="text-xs font-normal text-center tracking-wide">Без записей</h2>
          <div className="grid grid-cols-4 @min-md:grid-cols-8 @min-6xl:grid-cols-16 gap-2 auto-rows-max overflow-y-auto pr-1 grow scrollbar-thin scrollbar-track-bg scrollbar-thumb-muted-foreground/50">
            {data &&
              data.rows
                .filter((item) => !item.plant && !item.transit)
                .map((row) => <CanSmallCard key={`Card_${row.id}`} record={row} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
