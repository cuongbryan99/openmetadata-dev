"""Models for the TableDiff test case"""

from typing import List, Optional

from pydantic import BaseModel

from metadata.generated.schema.entity.data.table import Column, TableProfilerConfig
from metadata.generated.schema.entity.services.databaseService import (
    DatabaseServiceType,
)


class TableParameter(BaseModel):
    serviceUrl: str
    path: str
    columns: List[Column]
    database_service_type: DatabaseServiceType


class TableDiffRuntimeParameters(BaseModel):
    table1: TableParameter
    table2: TableParameter
    keyColumns: List[str]
    extraColumns: List[str]
    whereClause: Optional[str]
    table_profile_config: Optional[TableProfilerConfig]
