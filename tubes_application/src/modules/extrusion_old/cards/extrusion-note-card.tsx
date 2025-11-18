import { Card, Heading, ScrollArea } from "@chakra-ui/react";
import { useChiefTechnologistNote } from "../hooks/use-chief-technologist-note";
export default function ExtrusionNoteCard({ summary_id }: { summary_id: number | undefined }) {
  const id = summary_id ? summary_id : null;
  const { data, isSuccess } = useChiefTechnologistNote(id);
  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Header>
        <Heading size="3xl">Примечания главного технолога</Heading>
      </Card.Header>
      <Card.Body overflow="auto">
        {data && isSuccess && (
          <ScrollArea.Root>
            <ScrollArea.Viewport>
              <ScrollArea.Content paddingEnd="3" textStyle="xl">
                {data.note}
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        )}
      </Card.Body>
    </Card.Root>
  );
}
