import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  padding: 40px;
  transition: margin-left 0.3s ease;
  background: var(--background);
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  color: var(--text-color);
  font-size: 1.8rem;
  font-weight: 700;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Card = styled.div`
  background: var(--card-background);
  padding: 30px;
  border-radius: 16px;
  width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-color);
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 25px;
  transition: color 0.2s;
  &:hover {
    color: #6f42f7;
  }
`;

export const CardContent = styled.div`
  display: flex;
  gap: 30px;
`;

export const Label = styled.label`
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
`;

export const InputColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-background);
  color: var(--text-color);
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-background);
  color: var(--text-color);
  resize: none;
  min-height: 100px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--input-background);
  color: var(--text-color);
  height: 100px;
  font-size: 1rem;
`;

export const ImagePreviewContainer = styled.div`
  flex: 1;
  text-align: center;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const UploadPlaceholder = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 10px;
  padding: 30px;
  color: var(--text-muted);
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputButton = styled.label`
  display: inline-block;
  background: #6f42f7;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: 0.2s;
  &:hover {
    background: #5a32c5;
  }
`;

export const CreateButton = styled.button`
  width: 100%;
  margin-top: 25px;
  background: #6f42f7;
  color: white;
  font-weight: 700;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #5a32c5;
  }
`;
