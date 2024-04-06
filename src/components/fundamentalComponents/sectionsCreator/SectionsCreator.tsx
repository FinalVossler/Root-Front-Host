import React from "react";
import uuid from "react-uuid";
import { ITheme } from "roottypes";
import { MdDeleteOutline } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { BsHandIndexFill } from "react-icons/bs";

import useStyles from "./sectionsCreator.styles";
import Button from "../button";
import _ from "lodash";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

enum SectionDirectionEnum {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}

export interface ISection<T> {
  direction: SectionDirectionEnum;
  children: ISection<T>[];
  uuid: string;
  customData?: T;
}

export interface ISectionsCreatorProps<T, K> {
  theme: ITheme;
  SectionContent: React.FunctionComponent<{
    section: ISection<T>;
    handleSetSectionCustomData: (customData: T) => void;
    contentProps: K;
  }>;
  contentProps: K;
  sections?: ISection<T>[];
  setSections?: (sections: ISection<T>[]) => void;
}

function SectionsCreator<T, K>(props: ISectionsCreatorProps<T, K>) {
  const [sections, setSectionsFromUseState] = React.useState<ISection<T>[]>([]);

  const styles = useStyles({ theme: props.theme });

  //#region Utils
  const setSections = (sections: ISection<T>[]) => {
    if (props.setSections) {
      props.setSections(sections);
    } else {
      setSectionsFromUseState(sections);
    }
  };

  const getNewSection = (): ISection<T> => ({
    direction: SectionDirectionEnum.Horizontal,
    children: [],
    uuid: uuid(),
  });

  const getSectionDeep = (
    sections: ISection<T>[],
    searchedUuid: string
  ): ISection<T> | undefined => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.uuid === searchedUuid) {
        return section;
      }

      const foundSectionInChildren = getSectionDeep(
        section.children,
        searchedUuid
      );

      if (foundSectionInChildren) return foundSectionInChildren;
    }

    return undefined;
  };

  const getParentSectionDeep = (
    sections: ISection<T>[],
    searchedUuid: string,
    parentSection?: ISection<T>
  ): ISection<T> | undefined => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      if (section.uuid === searchedUuid) {
        return parentSection;
      }

      const foundSectionInChildren = getParentSectionDeep(
        section.children,
        searchedUuid,
        section
      );

      if (foundSectionInChildren) return foundSectionInChildren;
    }

    return undefined;
  };
  //#endregion Utils

  //#region Event handlers
  const handleAddChildSection = (parentSection: ISection<T>) => () => {
    const newSections = _.cloneDeep(sections);

    const foundSection = getSectionDeep(newSections, parentSection.uuid);

    if (foundSection) {
      foundSection.children.push(getNewSection());
      setSections(newSections);
    }
  };

  const handleRemoveSection = (sectionToDelete: ISection<T>) => () => {
    let newSections = _.cloneDeep(sections);

    const parentSection = getParentSectionDeep(
      newSections,
      sectionToDelete.uuid
    );

    if (parentSection) {
      parentSection.children = parentSection.children.filter(
        (section) => section.uuid !== sectionToDelete.uuid
      );
    } else {
      newSections = newSections.filter(
        (section) => section.uuid !== sectionToDelete.uuid
      );
    }

    setSections(newSections);
  };

  const handleChangeDirection = (section: ISection<T>) => () => {
    const newSections = _.cloneDeep(sections);

    const foundSection = getSectionDeep(newSections, section.uuid);

    if (foundSection) {
      foundSection.direction =
        section.direction === SectionDirectionEnum.Horizontal
          ? SectionDirectionEnum.Vertical
          : SectionDirectionEnum.Horizontal;
      setSections(newSections);
    }
  };

  const handleSetSectionCustomData =
    (section: ISection<T>) => (customData: T) => {
      const newSections = _.cloneDeep(sections);

      const foundSection = getSectionDeep(newSections, section.uuid);

      if (foundSection) {
        foundSection.customData = customData;
        setSections(newSections);
      }
    };

  const handleAddSection = () => {
    setSections([...sections, getNewSection()]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const newSections = _.cloneDeep(sections);

      let parentSection = getParentSectionDeep(newSections, active.id + "");

      const indexOfOld = (parentSection ? parentSection.children : newSections)
        .map((c) => c.uuid)
        .indexOf(active.id as string);
      const indexOfNew = (parentSection ? parentSection.children : newSections)
        .map((c) => c.uuid)
        .indexOf(over.id as string);

      if (parentSection) {
        const temp = parentSection.children[indexOfOld];
        parentSection.children[indexOfOld] = parentSection.children[indexOfNew];
        parentSection.children[indexOfNew] = temp;
      } else {
        const temp = newSections[indexOfOld];
        newSections[indexOfOld] = newSections[indexOfNew];
        newSections[indexOfNew] = temp;
      }

      setSections(newSections);
    }
  };
  //#endregion Event handlers

  //#region Effects
  React.useEffect(() => {
    if (props.sections) {
      setSectionsFromUseState(props.sections);
    }
  }, [props.sections]);
  //#endregion Effects

  return (
    <div className={styles.sectionsCreatorContainer}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          // @ts-ignore
          items={sections.map((section) => section.uuid)}
        >
          {sections.map((section) => {
            return (
              <Section
                key={section.uuid}
                theme={props.theme}
                section={section}
                handleAddChildSection={handleAddChildSection}
                handleChangeSectionDirection={handleChangeDirection}
                handleRemoveSection={handleRemoveSection}
                handleDragEnd={handleDragEnd}
                SectionContent={props.SectionContent}
                contentProps={props.contentProps}
                handleSetSectionCustomData={handleSetSectionCustomData}
              />
            );
          })}
        </SortableContext>
      </DndContext>

      <Button theme={props.theme} type="button" onClick={handleAddSection}>
        Add section
      </Button>
    </div>
  );
}

interface ISectionProps<T, K> {
  section: ISection<T>;
  theme: ITheme;
  handleAddChildSection: (parentSection: ISection<T>) => () => void;
  handleChangeSectionDirection: (section: ISection<T>) => () => void;
  handleRemoveSection: (section: ISection<T>) => () => void;
  handleDragEnd: (e: DragEndEvent) => void;
  SectionContent: ISectionsCreatorProps<T, K>["SectionContent"];
  contentProps: K;
  handleSetSectionCustomData: (section: ISection<T>) => (customData: T) => void;
}

function Section<T, K>(props: ISectionProps<T, K>) {
  const styles = useStyles({ theme: props.theme });
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.section.uuid,
  });
  const sorteStyles = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={styles.sectionContainer}
      ref={setNodeRef}
      style={sorteStyles}
    >
      <div className={styles.sectionConfiguration}>
        <Button
          theme={props.theme}
          type="button"
          className={styles.confButton}
          onClick={props.handleChangeSectionDirection(props.section)}
        >
          {
            {
              [SectionDirectionEnum.Horizontal]: "--",
              [SectionDirectionEnum.Vertical]: "|",
            }[props.section.direction]
          }
        </Button>

        <Button
          theme={props.theme}
          type="button"
          className={styles.confButton}
          onClick={props.handleRemoveSection(props.section)}
        >
          <MdDeleteOutline color={props.theme.errorColor} />
        </Button>

        <BsHandIndexFill
          color={props.theme.primary}
          fontSize={15}
          style={{ padding: "3px 5px" }}
          className={styles.confButton}
          {...attributes}
          {...listeners}
        />
      </div>

      {props.section.children.length === 0 && (
        <props.SectionContent
          section={props.section}
          handleSetSectionCustomData={props.handleSetSectionCustomData(
            props.section
          )}
          contentProps={props.contentProps}
        />
      )}

      {props.section.children.length > 0 && (
        <DndContext onDragEnd={props.handleDragEnd}>
          <SortableContext
            // @ts-ignore
            items={props.section.children.map((section) => section.uuid)}
          >
            <div
              className={styles.childSectionsContainer}
              style={{
                flexDirection:
                  props.section.direction === SectionDirectionEnum.Horizontal
                    ? "row"
                    : "column",
              }}
            >
              {props.section.children.map((childSection) => {
                return (
                  <Section
                    key={childSection.uuid}
                    section={childSection}
                    theme={props.theme}
                    handleAddChildSection={props.handleAddChildSection}
                    handleChangeSectionDirection={
                      props.handleChangeSectionDirection
                    }
                    handleRemoveSection={props.handleRemoveSection}
                    handleDragEnd={props.handleDragEnd}
                    SectionContent={props.SectionContent}
                    contentProps={props.contentProps}
                    handleSetSectionCustomData={
                      props.handleSetSectionCustomData
                    }
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Button
        theme={props.theme}
        type="button"
        onClick={props.handleAddChildSection(props.section)}
      >
        Add child section
      </Button>
    </div>
  );
}

export default SectionsCreator;
