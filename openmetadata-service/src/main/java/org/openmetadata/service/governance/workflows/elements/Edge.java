package org.openmetadata.service.governance.workflows.elements;

import static org.openmetadata.service.governance.workflows.Workflow.RESULT_VARIABLE;

import org.flowable.bpmn.model.BpmnModel;
import org.flowable.bpmn.model.Process;
import org.flowable.bpmn.model.SequenceFlow;
import org.openmetadata.common.utils.CommonUtil;

public class Edge {
  private final SequenceFlow edge;

  public Edge(org.openmetadata.schema.governance.workflows.elements.EdgeDefinition edgeDefinition) {
    SequenceFlow edge = new SequenceFlow(edgeDefinition.getFrom(), edgeDefinition.getTo());
    if (!CommonUtil.nullOrEmpty(edgeDefinition.getCondition())) {
      edge.setConditionExpression(getFlowableCondition(edgeDefinition.getCondition()));
    }
    this.edge = edge;
  }

  private String getFlowableCondition(boolean condition) {
    if (condition) {
      return String.format("${%s}", RESULT_VARIABLE);
    } else {
      return String.format("${!%s}", RESULT_VARIABLE);
    }
  }

  public void addToWorkflow(BpmnModel model, Process process) {
    process.addFlowElement(edge);
  }
}
