/*
 *  Copyright 2022 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Icon, { SearchOutlined } from '@ant-design/icons';
import { Space, Tooltip, Typography } from 'antd';
import { ExpandableConfig } from 'antd/lib/table/interface';
import classNames from 'classnames';
import { t } from 'i18next';
import {
  get,
  isEmpty,
  isUndefined,
  lowerCase,
  omit,
  toString,
  uniqBy,
  uniqueId,
  upperCase,
} from 'lodash';
import { EntityTags } from 'Models';
import React, { CSSProperties, Fragment } from 'react';
import { ReactComponent as AlertIcon } from '../assets/svg/alert.svg';
import { ReactComponent as AnnouncementIcon } from '../assets/svg/announcements-black.svg';
import { ReactComponent as ApplicationIcon } from '../assets/svg/application.svg';
import { ReactComponent as AutomatorBotIcon } from '../assets/svg/automator-bot.svg';
import { ReactComponent as GlossaryTermIcon } from '../assets/svg/book.svg';
import { ReactComponent as BotIcon } from '../assets/svg/bot.svg';
import { ReactComponent as ChartIcon } from '../assets/svg/chart.svg';
import { ReactComponent as ClassificationIcon } from '../assets/svg/classification.svg';
import { ReactComponent as ConversationIcon } from '../assets/svg/comment.svg';
import { ReactComponent as IconDataModel } from '../assets/svg/data-model.svg';
import { ReactComponent as IconDrag } from '../assets/svg/drag.svg';
import { ReactComponent as IconForeignKeyLineThrough } from '../assets/svg/foreign-key-line-through.svg';
import { ReactComponent as IconForeignKey } from '../assets/svg/foreign-key.svg';
import { ReactComponent as GlossaryIcon } from '../assets/svg/glossary.svg';
import { ReactComponent as APICollectionIcon } from '../assets/svg/ic-api-collection-default.svg';
import { ReactComponent as APIEndpointIcon } from '../assets/svg/ic-api-endpoint-default.svg';
import { ReactComponent as APIServiceIcon } from '../assets/svg/ic-api-service-default.svg';
import { ReactComponent as IconDown } from '../assets/svg/ic-arrow-down.svg';
import { ReactComponent as IconRight } from '../assets/svg/ic-arrow-right.svg';
import { ReactComponent as IconTestSuite } from '../assets/svg/ic-checklist.svg';
import { ReactComponent as DashboardIcon } from '../assets/svg/ic-dashboard.svg';
import { ReactComponent as DataQualityIcon } from '../assets/svg/ic-data-contract.svg';
import { ReactComponent as DataProductIcon } from '../assets/svg/ic-data-product.svg';
import { ReactComponent as DatabaseIcon } from '../assets/svg/ic-database.svg';
import { ReactComponent as DomainIcon } from '../assets/svg/ic-domain.svg';
import { ReactComponent as MlModelIcon } from '../assets/svg/ic-ml-model.svg';
import { ReactComponent as PersonaIcon } from '../assets/svg/ic-personas.svg';
import { ReactComponent as PipelineIcon } from '../assets/svg/ic-pipeline.svg';
import { ReactComponent as SchemaIcon } from '../assets/svg/ic-schema.svg';
import { ReactComponent as ContainerIcon } from '../assets/svg/ic-storage.svg';
import { ReactComponent as IconStoredProcedure } from '../assets/svg/ic-stored-procedure.svg';
import { ReactComponent as TableIcon } from '../assets/svg/ic-table.svg';
import { ReactComponent as TopicIcon } from '../assets/svg/ic-topic.svg';
import { ReactComponent as IconDistLineThrough } from '../assets/svg/icon-dist-line-through.svg';
import { ReactComponent as IconDistKey } from '../assets/svg/icon-distribution.svg';
import { ReactComponent as IconKeyLineThrough } from '../assets/svg/icon-key-line-through.svg';
import { ReactComponent as IconKey } from '../assets/svg/icon-key.svg';
import { ReactComponent as IconNotNullLineThrough } from '../assets/svg/icon-not-null-line-through.svg';
import { ReactComponent as IconSortLineThrough } from '../assets/svg/icon-sort-line-through.svg';

import { ReactComponent as IconNotNull } from '../assets/svg/icon-not-null.svg';
import { ReactComponent as RoleIcon } from '../assets/svg/icon-role-grey.svg';
import { ReactComponent as IconSortKey } from '../assets/svg/icon-sort.svg';
import { ReactComponent as IconUniqueLineThrough } from '../assets/svg/icon-unique-line-through.svg';
import { ReactComponent as IconUnique } from '../assets/svg/icon-unique.svg';
import { ReactComponent as KPIIcon } from '../assets/svg/kpi.svg';
import { ReactComponent as LocationIcon } from '../assets/svg/location.svg';
import { ReactComponent as MetadataServiceIcon } from '../assets/svg/metadata-service.svg';
import { ReactComponent as MetricIcon } from '../assets/svg/metric.svg';
import { ReactComponent as NotificationIcon } from '../assets/svg/notification.svg';
import { ReactComponent as PolicyIcon } from '../assets/svg/policies.svg';
import { ReactComponent as ServicesIcon } from '../assets/svg/services.svg';
import { ReactComponent as TagIcon } from '../assets/svg/tag.svg';
import { ReactComponent as TaskIcon } from '../assets/svg/task-ic.svg';
import { ReactComponent as TeamIcon } from '../assets/svg/teams.svg';
import { ReactComponent as UserIcon } from '../assets/svg/user.svg';
import { ActivityFeedTab } from '../components/ActivityFeed/ActivityFeedTab/ActivityFeedTab.component';
import { CustomPropertyTable } from '../components/common/CustomPropertyTable/CustomPropertyTable';
import ErrorPlaceHolder from '../components/common/ErrorWithPlaceholder/ErrorPlaceHolder';
import QueryViewer from '../components/common/QueryViewer/QueryViewer.component';
import TabsLabel from '../components/common/TabsLabel/TabsLabel.component';
import { TabProps } from '../components/common/TabsLabel/TabsLabel.interface';
import TableProfiler from '../components/Database/Profiler/TableProfiler/TableProfiler';
import SampleDataTableComponent from '../components/Database/SampleDataTable/SampleDataTable.component';
import TableQueries from '../components/Database/TableQueries/TableQueries';
import Lineage from '../components/Lineage/Lineage.component';
import { SourceType } from '../components/SearchedData/SearchedData.interface';
import { NON_SERVICE_TYPE_ASSETS } from '../constants/Assets.constants';
import { FQN_SEPARATOR_CHAR } from '../constants/char.constants';
import { DE_ACTIVE_COLOR, TEXT_BODY_COLOR } from '../constants/constants';
import LineageProvider from '../context/LineageProvider/LineageProvider';
import { ERROR_PLACEHOLDER_TYPE } from '../enums/common.enum';
import { EntityTabs, EntityType, FqnPart } from '../enums/entity.enum';
import { SearchIndex } from '../enums/search.enum';
import { ConstraintTypes, PrimaryTableDataTypes } from '../enums/table.enum';
import { SearchIndexField } from '../generated/entity/data/searchIndex';
import {
  Column,
  ConstraintType,
  DataType,
  TableConstraint,
} from '../generated/entity/data/table';
import { Field } from '../generated/type/schema';
import { LabelType, State, TagLabel } from '../generated/type/tagLabel';
import {
  getPartialNameFromTableFQN,
  getTableFQNFromColumnFQN,
  sortTagsCaseInsensitive,
} from './CommonUtils';
import EntityLink from './EntityLink';
import searchClassBase from './SearchClassBase';
import serviceUtilClassBase from './ServiceUtilClassBase';
import { ordinalize } from './StringsUtils';
import { TableDetailPageTabProps } from './TableClassBase';
import { TableFieldsInfoCommonEntities } from './TableUtils.interface';

import { ReactComponent as IconArray } from '../assets/svg/data-type-icon/array.svg';
import { ReactComponent as IconBinary } from '../assets/svg/data-type-icon/binary.svg';
import { ReactComponent as IconBitmap } from '../assets/svg/data-type-icon/bitmap.svg';
import { ReactComponent as IconBoolean } from '../assets/svg/data-type-icon/boolean.svg';
import { ReactComponent as IconDateTime } from '../assets/svg/data-type-icon/data-time-range.svg';
import { ReactComponent as IconDate } from '../assets/svg/data-type-icon/date.svg';
import { ReactComponent as IconDecimal } from '../assets/svg/data-type-icon/decimal.svg';
import { ReactComponent as IconDouble } from '../assets/svg/data-type-icon/double.svg';
import { ReactComponent as IconEnum } from '../assets/svg/data-type-icon/enum.svg';
import { ReactComponent as IconError } from '../assets/svg/data-type-icon/error.svg';
import { ReactComponent as IconGeometry } from '../assets/svg/data-type-icon/geometry.svg';
import { ReactComponent as IconInteger } from '../assets/svg/data-type-icon/integer.svg';
import { ReactComponent as IconIpVersion } from '../assets/svg/data-type-icon/ipv6.svg';
import { ReactComponent as IconJson } from '../assets/svg/data-type-icon/json.svg';
import { ReactComponent as IconMap } from '../assets/svg/data-type-icon/map.svg';
import { ReactComponent as IconMoney } from '../assets/svg/data-type-icon/money.svg';
import { ReactComponent as IconNull } from '../assets/svg/data-type-icon/null.svg';
import { ReactComponent as IconNumeric } from '../assets/svg/data-type-icon/numeric.svg';
import { ReactComponent as IconPolygon } from '../assets/svg/data-type-icon/polygon.svg';
import { ReactComponent as IconRecord } from '../assets/svg/data-type-icon/record.svg';
import { ReactComponent as IconString } from '../assets/svg/data-type-icon/string.svg';
import { ReactComponent as IconStruct } from '../assets/svg/data-type-icon/struct.svg';
import { ReactComponent as IconTime } from '../assets/svg/data-type-icon/time.svg';
import { ReactComponent as IconTimestamp } from '../assets/svg/data-type-icon/timestamp.svg';
import { ReactComponent as IconTsQuery } from '../assets/svg/data-type-icon/ts-query.svg';
import { ReactComponent as IconUnion } from '../assets/svg/data-type-icon/union.svg';
import { ReactComponent as IconUnknown } from '../assets/svg/data-type-icon/unknown.svg';
import { ReactComponent as IconVarchar } from '../assets/svg/data-type-icon/varchar.svg';
import { ReactComponent as IconVariant } from '../assets/svg/data-type-icon/variant.svg';
import { ReactComponent as IconXML } from '../assets/svg/data-type-icon/xml.svg';
import ConstraintIcon from '../pages/TableDetailsPageV1/TableConstraints/ConstraintIcon';

export const getUsagePercentile = (pctRank: number, isLiteral = false) => {
  const percentile = Math.round(pctRank * 10) / 10;
  const ordinalPercentile = ordinalize(percentile);
  const usagePercentile = `${
    isLiteral ? t('label.usage') : ''
  } ${ordinalPercentile} ${t('label.pctile-lowercase')}`;

  return usagePercentile;
};

export const getTierTags = (tags: Array<TagLabel>) => {
  const tierTag = tags.find((item) =>
    item.tagFQN.startsWith(`Tier${FQN_SEPARATOR_CHAR}`)
  );

  return tierTag;
};

export const getTagsWithoutTier = (
  tags: Array<EntityTags>
): Array<EntityTags> => {
  return tags.filter(
    (item) => !item.tagFQN.startsWith(`Tier${FQN_SEPARATOR_CHAR}`)
  );
};

export const getConstraintIcon = ({
  constraint = '',
  className = '',
  width = '16px',
  isConstraintAdded,
  isConstraintDeleted,
}: {
  constraint?: string;
  className?: string;
  width?: string;
  isConstraintAdded?: boolean;
  isConstraintDeleted?: boolean;
}) => {
  let title: string, icon: SvgComponent, dataTestId: string;
  switch (constraint) {
    case ConstraintTypes.PRIMARY_KEY: {
      title = t('label.primary-key');
      icon = isConstraintDeleted ? IconKeyLineThrough : IconKey;
      dataTestId = 'primary-key';

      break;
    }
    case ConstraintTypes.UNIQUE: {
      title = t('label.unique');
      icon = isConstraintDeleted ? IconUniqueLineThrough : IconUnique;
      dataTestId = 'unique';

      break;
    }
    case ConstraintTypes.NOT_NULL: {
      title = t('label.not-null');
      icon = isConstraintDeleted ? IconNotNullLineThrough : IconNotNull;
      dataTestId = 'not-null';

      break;
    }
    case ConstraintTypes.FOREIGN_KEY: {
      title = t('label.foreign-key');
      icon = isConstraintDeleted ? IconForeignKeyLineThrough : IconForeignKey;
      dataTestId = 'foreign-key';

      break;
    }
    case ConstraintType.DistKey: {
      title = t('label.entity-key', {
        entity: t('label.dist'),
      });
      icon = isConstraintDeleted ? IconDistLineThrough : IconDistKey;
      dataTestId = 'dist-key';

      break;
    }
    case ConstraintType.SortKey: {
      title = t('label.entity-key', {
        entity: t('label.sort'),
      });
      icon = isConstraintDeleted ? IconSortLineThrough : IconSortKey;
      dataTestId = 'sort-key';

      break;
    }
    default:
      return null;
  }

  return (
    <Tooltip
      className={classNames(className)}
      placement="bottom"
      title={title}
      trigger="hover">
      <Icon
        alt={title}
        className={classNames({
          'diff-added': isConstraintAdded,
          'diff-removed': isConstraintDeleted,
        })}
        component={icon}
        data-testid={`constraint-icon-${dataTestId}`}
        style={{ fontSize: width }}
      />
    </Tooltip>
  );
};

export const getColumnDataTypeIcon = ({
  dataType,
  width = '16px',
}: {
  dataType: DataType;
  width?: string;
}) => {
  const dataTypeIcons = {
    [DataType.Array]: IconArray,
    [DataType.Bit]: IconBinary,
    [DataType.Binary]: IconBinary,
    [DataType.Bitmap]: IconBitmap,
    [DataType.Image]: IconBitmap,
    [DataType.Boolean]: IconBoolean,
    [DataType.Date]: IconDate,
    [DataType.Year]: IconDate,
    [DataType.Datetime]: IconDateTime,
    [DataType.Datetimerange]: IconDateTime,
    [DataType.Double]: IconDouble,
    [DataType.Float]: IconDouble,
    [DataType.Number]: IconDouble,
    [DataType.Decimal]: IconDecimal,
    [DataType.Enum]: IconEnum,
    [DataType.Error]: IconError,
    [DataType.Map]: IconMap,
    [DataType.Geography]: IconMap,
    [DataType.Geometry]: IconGeometry,
    [DataType.Ipv4]: IconIpVersion,
    [DataType.Ipv6]: IconIpVersion,
    [DataType.JSON]: IconJson,
    [DataType.Numeric]: IconNumeric,
    [DataType.Long]: IconNumeric,
    [DataType.Money]: IconMoney,
    [DataType.Char]: IconVarchar,
    [DataType.Text]: IconVarchar,
    [DataType.Ntext]: IconVarchar,
    [DataType.Mediumtext]: IconVarchar,
    [DataType.Varchar]: IconVarchar,
    [DataType.Int]: IconInteger,
    [DataType.Bigint]: IconInteger,
    [DataType.Largeint]: IconInteger,
    [DataType.Smallint]: IconInteger,
    [DataType.Tinyint]: IconInteger,
    [DataType.Polygon]: IconPolygon,
    [DataType.Null]: IconNull,
    [DataType.Record]: IconRecord,
    [DataType.Table]: IconRecord,
    [DataType.String]: IconString,
    [DataType.Struct]: IconStruct,
    [DataType.Time]: IconTime,
    [DataType.Timestamp]: IconTimestamp,
    [DataType.Timestampz]: IconTimestamp,
    [DataType.Tsquery]: IconTsQuery,
    [DataType.Union]: IconUnion,
    [DataType.Unknown]: IconUnknown,
    [DataType.Variant]: IconVariant,
    [DataType.XML]: IconXML,
  };

  const icon = dataTypeIcons[dataType as keyof typeof dataTypeIcons] || null;

  return <Icon alt={dataType} component={icon} style={{ fontSize: width }} />;
};

export const getEntityIcon = (
  indexType: string,
  iconClass = '',
  iconStyle = {}
) => {
  let Icon;
  let className = iconClass;
  const style: CSSProperties = iconStyle;
  const entityIconMapping: Record<string, SvgComponent> = {
    [SearchIndex.DATABASE]: DatabaseIcon,
    [EntityType.DATABASE]: DatabaseIcon,
    [SearchIndex.DATABASE_SERVICE]: DatabaseIcon,
    [EntityType.DATABASE_SERVICE]: DatabaseIcon,
    [SearchIndex.DATABASE_SCHEMA]: SchemaIcon,
    [EntityType.DATABASE_SCHEMA]: SchemaIcon,
    [SearchIndex.TOPIC]: TopicIcon,
    [EntityType.TOPIC]: TopicIcon,
    [EntityType.MESSAGING_SERVICE]: TopicIcon,
    [SearchIndex.MESSAGING_SERVICE]: TopicIcon,
    [SearchIndex.DASHBOARD]: DashboardIcon,
    [EntityType.DASHBOARD]: DashboardIcon,
    [EntityType.DASHBOARD_SERVICE]: DashboardIcon,
    [SearchIndex.DASHBOARD_SERVICE]: DashboardIcon,
    [SearchIndex.MLMODEL]: MlModelIcon,
    [EntityType.MLMODEL]: MlModelIcon,
    [EntityType.MLMODEL_SERVICE]: MlModelIcon,
    [SearchIndex.ML_MODEL_SERVICE]: MlModelIcon,
    [SearchIndex.PIPELINE]: PipelineIcon,
    [EntityType.PIPELINE]: PipelineIcon,
    [EntityType.PIPELINE_SERVICE]: PipelineIcon,
    [SearchIndex.PIPELINE_SERVICE]: PipelineIcon,
    [SearchIndex.CONTAINER]: ContainerIcon,
    [EntityType.CONTAINER]: ContainerIcon,
    [EntityType.STORAGE_SERVICE]: ContainerIcon,
    [SearchIndex.STORAGE_SERVICE]: ContainerIcon,
    [SearchIndex.DASHBOARD_DATA_MODEL]: IconDataModel,
    [EntityType.DASHBOARD_DATA_MODEL]: IconDataModel,
    [SearchIndex.STORED_PROCEDURE]: IconStoredProcedure,
    [EntityType.STORED_PROCEDURE]: IconStoredProcedure,
    [EntityType.CLASSIFICATION]: ClassificationIcon,
    [SearchIndex.TAG]: TagIcon,
    [EntityType.TAG]: TagIcon,
    [SearchIndex.GLOSSARY]: GlossaryIcon,
    [EntityType.GLOSSARY]: GlossaryIcon,
    [SearchIndex.GLOSSARY_TERM]: GlossaryTermIcon,
    [EntityType.GLOSSARY_TERM]: GlossaryTermIcon,
    [SearchIndex.DOMAIN]: DomainIcon,
    [EntityType.DOMAIN]: DomainIcon,
    [SearchIndex.CHART]: ChartIcon,
    [EntityType.CHART]: ChartIcon,
    [SearchIndex.TABLE]: TableIcon,
    [EntityType.TABLE]: TableIcon,
    [EntityType.METADATA_SERVICE]: MetadataServiceIcon,
    [SearchIndex.DATA_PRODUCT]: DataProductIcon,
    [EntityType.DATA_PRODUCT]: DataProductIcon,
    [EntityType.TEST_CASE]: IconTestSuite,
    [EntityType.TEST_SUITE]: IconTestSuite,
    [EntityType.BOT]: BotIcon,
    [EntityType.TEAM]: TeamIcon,
    [EntityType.APPLICATION]: ApplicationIcon,
    [EntityType.PERSONA]: PersonaIcon,
    [EntityType.ROLE]: RoleIcon,
    [EntityType.POLICY]: PolicyIcon,
    [EntityType.EVENT_SUBSCRIPTION]: AlertIcon,
    [EntityType.USER]: UserIcon,
    [SearchIndex.USER]: UserIcon,
    [EntityType.INGESTION_PIPELINE]: PipelineIcon,
    [SearchIndex.INGESTION_PIPELINE]: PipelineIcon,
    [EntityType.ALERT]: AlertIcon,
    [EntityType.KPI]: KPIIcon,
    ['tagCategory']: ClassificationIcon,
    ['announcement']: AnnouncementIcon,
    ['conversation']: ConversationIcon,
    ['task']: TaskIcon,
    ['dataQuality']: DataQualityIcon,
    ['services']: ServicesIcon,
    ['automator']: AutomatorBotIcon,
    ['notification']: NotificationIcon,
    [EntityType.API_ENDPOINT]: APIEndpointIcon,
    [SearchIndex.API_ENDPOINT_INDEX]: APIEndpointIcon,
    [EntityType.METRIC]: MetricIcon,
    [SearchIndex.METRIC_SEARCH_INDEX]: MetricIcon,
    [EntityType.API_SERVICE]: APIServiceIcon,
    [SearchIndex.API_SERVICE_INDEX]: APIServiceIcon,
    [EntityType.API_COLLECTION]: APICollectionIcon,
    [SearchIndex.API_COLLECTION_INDEX]: APICollectionIcon,
    ['location']: LocationIcon,
  };

  switch (indexType) {
    case EntityType.SEARCH_INDEX:
    case SearchIndex.SEARCH_INDEX:
    case EntityType.SEARCH_SERVICE:
    case SearchIndex.SEARCH_SERVICE:
      Icon = SearchOutlined;
      className = 'text-sm text-inherit';

      break;

    default:
      Icon = entityIconMapping[indexType];

      break;
  }

  // If icon is not found, return null
  return Icon ? <Icon className={className} style={style} /> : null;
};

export const getServiceIcon = (source: SourceType) => {
  const isDataAsset = NON_SERVICE_TYPE_ASSETS.includes(
    source.entityType as EntityType
  );

  if (isDataAsset) {
    return searchClassBase.getEntityIcon(
      source.entityType ?? '',
      'service-icon w-7 h-7',
      {
        color: DE_ACTIVE_COLOR,
      }
    );
  } else {
    return (
      <img
        alt="service-icon"
        className="inline service-icon h-7"
        src={serviceUtilClassBase.getServiceTypeLogo(source)}
      />
    );
  }
};

export const makeRow = <T extends Column | SearchIndexField>(column: T) => {
  return {
    description: column.description ?? '',
    // Sorting tags as the response of PATCH request does not return the sorted order
    // of tags, but is stored in sorted manner in the database
    // which leads to wrong PATCH payload sent after further tags removal
    tags: sortTagsCaseInsensitive(column.tags ?? []),
    key: column?.name,
    ...column,
  };
};

export const makeData = <T extends Column | SearchIndexField>(
  columns: T[] = []
): Array<T & { id: string }> => {
  return columns.map((column) => ({
    ...makeRow(column),
    id: uniqueId(column.name),
    children: column.children ? makeData<T>(column.children as T[]) : undefined,
  }));
};

export const getDataTypeString = (dataType: string): string => {
  switch (upperCase(dataType)) {
    case DataType.String:
    case DataType.Char:
    case DataType.Text:
    case DataType.Varchar:
    case DataType.Mediumtext:
    case DataType.Mediumblob:
    case DataType.Blob:
      return PrimaryTableDataTypes.VARCHAR;
    case DataType.Timestamp:
    case DataType.Time:
      return PrimaryTableDataTypes.TIMESTAMP;
    case DataType.Date:
      return PrimaryTableDataTypes.DATE;
    case DataType.Int:
    case DataType.Float:
    case DataType.Smallint:
    case DataType.Bigint:
    case DataType.Numeric:
    case DataType.Tinyint:
    case DataType.Decimal:
      return PrimaryTableDataTypes.NUMERIC;
    case DataType.Boolean:
    case DataType.Enum:
      return PrimaryTableDataTypes.BOOLEAN;
    default:
      return dataType;
  }
};

export const generateEntityLink = (fqn: string, includeColumn = false) => {
  if (includeColumn) {
    const tableFqn = getTableFQNFromColumnFQN(fqn);
    const columnName = getPartialNameFromTableFQN(fqn, [FqnPart.NestedColumn]);

    return EntityLink.getTableEntityLink(tableFqn, columnName);
  } else {
    return EntityLink.getTableEntityLink(fqn);
  }
};

export function getTableExpandableConfig<T>(
  isDraggable?: boolean
): ExpandableConfig<T> {
  const expandableConfig: ExpandableConfig<T> = {
    expandIcon: ({ expanded, onExpand, expandable, record }) =>
      expandable ? (
        <>
          {isDraggable && (
            <IconDrag className="m-r-xs drag-icon" height={12} width={8} />
          )}
          <Icon
            className="m-r-xs vertical-baseline"
            component={expanded ? IconDown : IconRight}
            data-testid="expand-icon"
            style={{ fontSize: '10px', color: TEXT_BODY_COLOR }}
            onClick={(e) => onExpand(record, e)}
          />
        </>
      ) : (
        isDraggable && (
          <>
            <IconDrag className="m-r-xs drag-icon" height={12} width={8} />
            <span className="expand-cell-empty-icon-container" />
          </>
        )
      ),
  };

  return expandableConfig;
}

export const prepareConstraintIcon = ({
  columnName,
  columnConstraint,
  tableConstraints,
  iconClassName,
  iconWidth,
  isColumnConstraintAdded,
  isColumnConstraintDeleted,
  isTableConstraintAdded,
  isTableConstraintDeleted,
}: {
  columnName: string;
  columnConstraint?: string;
  tableConstraints?: TableConstraint[];
  iconClassName?: string;
  iconWidth?: string;
  isColumnConstraintAdded?: boolean;
  isColumnConstraintDeleted?: boolean;
  isTableConstraintAdded?: boolean;
  isTableConstraintDeleted?: boolean;
}) => {
  // get the table constraints for column
  const filteredTableConstraints = uniqBy(
    tableConstraints?.filter((constraint) =>
      constraint.columns?.includes(columnName)
    ),
    'constraintType'
  );

  // prepare column constraint element
  const columnConstraintEl = columnConstraint
    ? getConstraintIcon({
        constraint: columnConstraint,
        className: iconClassName ?? 'm-r-xs',
        width: iconWidth,
        isConstraintAdded: isColumnConstraintAdded,
        isConstraintDeleted: isColumnConstraintDeleted,
      })
    : null;

  // prepare table constraint element
  const tableConstraintEl = filteredTableConstraints
    ? filteredTableConstraints.map((tableConstraint) =>
        getConstraintIcon({
          constraint: tableConstraint.constraintType,
          className: iconClassName ?? 'm-r-xs',
          width: iconWidth,
          isConstraintAdded: isTableConstraintAdded,
          isConstraintDeleted: isTableConstraintDeleted,
        })
      )
    : null;

  return (
    <span data-testid="constraints">
      {columnConstraintEl} {tableConstraintEl}
    </span>
  );
};

export const getAllRowKeysByKeyName = <
  T extends Column | Field | SearchIndexField
>(
  data: T[],
  keyName: keyof T
) => {
  let keys: string[] = [];

  data.forEach((item) => {
    if (item.children && item.children.length > 0) {
      keys.push(toString(item[keyName]));
      keys = [
        ...keys,
        ...getAllRowKeysByKeyName(item.children as T[], keyName),
      ];
    }
  });

  return keys;
};

export const searchInFields = <T extends SearchIndexField | Column>(
  searchIndex: Array<T>,
  searchText: string
): Array<T> => {
  const searchedValue: Array<T> = searchIndex.reduce(
    (searchedFields, field) => {
      const isContainData =
        lowerCase(field.name).includes(searchText) ||
        lowerCase(field.description).includes(searchText) ||
        lowerCase(getDataTypeString(field.dataType)).includes(searchText);

      if (isContainData) {
        return [...searchedFields, field];
      } else if (!isUndefined(field.children)) {
        const searchedChildren = searchInFields(
          field.children as T[],
          searchText
        );
        if (searchedChildren.length > 0) {
          return [
            ...searchedFields,
            {
              ...field,
              children: searchedChildren,
            },
          ];
        }
      }

      return searchedFields;
    },
    [] as Array<T>
  );

  return searchedValue;
};

export const updateFieldTags = <T extends TableFieldsInfoCommonEntities>(
  changedFieldFQN: string,
  newFieldTags: EntityTags[],
  searchIndexFields?: Array<T>
) => {
  searchIndexFields?.forEach((field) => {
    if (field.fullyQualifiedName === changedFieldFQN) {
      field.tags = getUpdatedTags(newFieldTags);
    } else {
      updateFieldTags(
        changedFieldFQN,
        newFieldTags,
        field?.children as Array<T>
      );
    }
  });
};

export const getUpdatedTags = (newFieldTags: Array<EntityTags>): TagLabel[] => {
  const mappedNewTags: TagLabel[] = newFieldTags.map((tag) => ({
    ...omit(tag, 'isRemovable'),
    labelType: LabelType.Manual,
    state: State.Confirmed,
    source: tag.source || 'Classification',
    tagFQN: tag.tagFQN,
  }));

  return mappedNewTags;
};

export const updateFieldDescription = <T extends TableFieldsInfoCommonEntities>(
  changedFieldFQN: string,
  description: string,
  searchIndexFields?: Array<T>
) => {
  searchIndexFields?.forEach((field) => {
    if (field.fullyQualifiedName === changedFieldFQN) {
      field.description = description;
    } else {
      updateFieldDescription(
        changedFieldFQN,
        description,
        field?.children as Array<T>
      );
    }
  });
};

export const getTableDetailPageBaseTabs = ({
  schemaTab,
  queryCount,
  isTourOpen,
  tablePermissions,
  activeTab,
  deleted,
  tableDetails,
  totalFeedCount,
  onExtensionUpdate,
  getEntityFeedCount,
  handleFeedCount,
  viewAllPermission,
  editCustomAttributePermission,
  viewSampleDataPermission,
  viewQueriesPermission,
  viewProfilerPermission,
  editLineagePermission,
  fetchTableDetails,
  testCaseSummary,
  isViewTableType,
}: TableDetailPageTabProps): TabProps[] => {
  return [
    {
      label: <TabsLabel id={EntityTabs.SCHEMA} name={t('label.schema')} />,
      key: EntityTabs.SCHEMA,
      children: schemaTab,
    },
    {
      label: (
        <TabsLabel
          count={totalFeedCount}
          id={EntityTabs.ACTIVITY_FEED}
          isActive={activeTab === EntityTabs.ACTIVITY_FEED}
          name={t('label.activity-feed-and-task-plural')}
        />
      ),
      key: EntityTabs.ACTIVITY_FEED,
      children: (
        <ActivityFeedTab
          refetchFeed
          columns={tableDetails?.columns}
          entityFeedTotalCount={totalFeedCount}
          entityType={EntityType.TABLE}
          fqn={tableDetails?.fullyQualifiedName ?? ''}
          owners={tableDetails?.owners}
          onFeedUpdate={getEntityFeedCount}
          onUpdateEntityDetails={fetchTableDetails}
          onUpdateFeedCount={handleFeedCount}
        />
      ),
    },
    {
      label: (
        <TabsLabel id={EntityTabs.SAMPLE_DATA} name={t('label.sample-data')} />
      ),

      key: EntityTabs.SAMPLE_DATA,
      children:
        !isTourOpen && !viewSampleDataPermission ? (
          <ErrorPlaceHolder type={ERROR_PLACEHOLDER_TYPE.PERMISSION} />
        ) : (
          <SampleDataTableComponent
            isTableDeleted={deleted}
            owners={tableDetails?.owners ?? []}
            permissions={tablePermissions}
            tableId={tableDetails?.id ?? ''}
          />
        ),
    },
    {
      label: (
        <TabsLabel
          count={queryCount}
          id={EntityTabs.TABLE_QUERIES}
          isActive={activeTab === EntityTabs.TABLE_QUERIES}
          name={t('label.query-plural')}
        />
      ),
      key: EntityTabs.TABLE_QUERIES,
      children: !viewQueriesPermission ? (
        <ErrorPlaceHolder type={ERROR_PLACEHOLDER_TYPE.PERMISSION} />
      ) : (
        <TableQueries
          isTableDeleted={deleted}
          tableId={tableDetails?.id ?? ''}
        />
      ),
    },
    {
      label: (
        <TabsLabel
          id={EntityTabs.PROFILER}
          name={t('label.data-observability')}
        />
      ),
      key: EntityTabs.PROFILER,
      children:
        !isTourOpen && !viewProfilerPermission ? (
          <ErrorPlaceHolder type={ERROR_PLACEHOLDER_TYPE.PERMISSION} />
        ) : (
          <TableProfiler
            permissions={tablePermissions}
            table={tableDetails}
            testCaseSummary={testCaseSummary}
          />
        ),
    },
    {
      label: <TabsLabel id={EntityTabs.LINEAGE} name={t('label.lineage')} />,
      key: EntityTabs.LINEAGE,
      children: (
        <LineageProvider>
          <Lineage
            deleted={deleted}
            entity={tableDetails as SourceType}
            entityType={EntityType.TABLE}
            hasEditAccess={editLineagePermission}
          />
        </LineageProvider>
      ),
    },
    {
      label: <TabsLabel id={EntityTabs.DBT} name={t('label.dbt-lowercase')} />,
      isHidden: !(
        tableDetails?.dataModel?.sql || tableDetails?.dataModel?.rawSql
      ),
      key: EntityTabs.DBT,
      children: (
        <QueryViewer
          sqlQuery={
            get(tableDetails, 'dataModel.sql', '') ||
            get(tableDetails, 'dataModel.rawSql', '')
          }
          title={
            <Space className="p-y-xss">
              <Typography.Text className="text-grey-muted">
                {`${t('label.path')}:`}
              </Typography.Text>
              <Typography.Text>{tableDetails?.dataModel?.path}</Typography.Text>
            </Space>
          }
        />
      ),
    },
    {
      label: (
        <TabsLabel
          id={
            isViewTableType
              ? EntityTabs.VIEW_DEFINITION
              : EntityTabs.SCHEMA_DEFINITION
          }
          name={
            isViewTableType
              ? t('label.view-definition')
              : t('label.schema-definition')
          }
        />
      ),
      isHidden: isUndefined(tableDetails?.schemaDefinition),
      key: isViewTableType
        ? EntityTabs.VIEW_DEFINITION
        : EntityTabs.SCHEMA_DEFINITION,
      children: <QueryViewer sqlQuery={tableDetails?.schemaDefinition ?? ''} />,
    },
    {
      label: (
        <TabsLabel
          id={EntityTabs.CUSTOM_PROPERTIES}
          name={t('label.custom-property-plural')}
        />
      ),
      key: EntityTabs.CUSTOM_PROPERTIES,
      children: tableDetails && (
        <div className="m-sm">
          <CustomPropertyTable<EntityType.TABLE>
            entityDetails={tableDetails}
            entityType={EntityType.TABLE}
            handleExtensionUpdate={onExtensionUpdate}
            hasEditAccess={editCustomAttributePermission}
            hasPermission={viewAllPermission}
          />
        </div>
      ),
    },
  ];
};

/**
 * @param constraints contains column names for constraints which
 * @param type constraint type
 * @returns constraint object with columns and constraint type or empty array if constraints are empty
 */
export const createTableConstraintObject = (
  constraints: string[],
  type: ConstraintType
) =>
  !isEmpty(constraints) ? [{ columns: constraints, constraintType: type }] : [];

export const tableConstraintRendererBasedOnType = (
  constraintType: ConstraintType,
  columns?: string[]
) => {
  const isSingleColumn = columns?.length === 1;

  return (
    <div
      className="d-flex constraint-columns"
      data-testid={`${constraintType}-container`}
      key={constraintType}>
      <Space
        className="constraint-icon-container"
        direction="vertical"
        size={0}>
        {columns?.map((column, index) => (
          <Fragment key={column}>
            {(columns?.length ?? 0) - 1 !== index || isSingleColumn ? (
              <ConstraintIcon
                constraintType={constraintType}
                showOnlyIcon={isSingleColumn}
              />
            ) : null}
          </Fragment>
        ))}
      </Space>

      <Space direction="vertical" size={16}>
        {columns?.map((column) => (
          <Typography.Text ellipsis={{ tooltip: true }} key={column}>
            {column}
          </Typography.Text>
        ))}
      </Space>
    </div>
  );
};

/**
 * Recursive function to get all columns from table column and its children
 * @param columns Table Columns for creating options in table constraint form
 * @returns column options with label and value
 */
export const getColumnOptionsFromTableColumn = (columns: Column[]) => {
  const options: {
    label: string;
    value: string;
  }[] = [];

  columns.forEach((item) => {
    if (!isEmpty(item.children)) {
      options.push(...getColumnOptionsFromTableColumn(item.children ?? []));
    }

    options.push({
      label: item.name,
      value: item.name,
    });
  });

  return options;
};
