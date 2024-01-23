export interface InspectionModel {
  Id: number;
  GuId: string;
  Date: string;
  VehicleId: number;
  EmployeeId: number;
  Description: string;
  CompanyId: number;
  Km: number;
  QuestionAnswerDetails: QuestionAnswerDetail[];
}

export interface QuestionAnswerDetail {
  Id: number;
  VehicleInspectionId: number;
  QuestionId: number;
  QuestionOptionAnswer: string;
  Comment: string;
}
