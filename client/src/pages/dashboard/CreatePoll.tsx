import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Trash2, Calendar, Layout, MessageSquare, Info, Loader2 } from 'lucide-react';
import './CreatePoll.css';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const optionSchema = z.object({
  value: z.string().min(1, 'Option cannot be empty'),
});

const questionSchema = z.object({
  question: z.string().min(3, 'Question must be at least 3 characters'),
  required: z.boolean().default(false),
  options: z.array(optionSchema).min(2, 'At least 2 options are required'),
});

const pollSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  responseMode: z.enum(['anonymous', 'authenticated']).default('anonymous'),
  expiresAt: z.string().optional().nullable(),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

type PollFormData = z.infer<typeof pollSchema>;

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<PollFormData>({
    //resolver: zodResolver(pollSchema),
    defaultValues: {
      responseMode: 'anonymous',
      questions: [{ question: '', required: false, options: [{ value: '' }, { value: '' }] }]
    }
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = async (data: PollFormData) => {
    try {
      await api.post('/poll', data);
      toast.success('Poll created successfully!');
      navigate('/dashboard/polls');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create poll');
    }
  };

  return (
    <div className="create-poll-container">
      <div className="page-header" data-reveal>
        <div>
          <h2>Create New Poll</h2>
          <p>Design your poll and start collecting insights.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="create-poll-form">
        <div className="form-grid">
          <div className="form-left-col">
            <div className="glass-card form-section" data-reveal>
              <h3><Layout size={18} /> General Information</h3>
              <div className="input-group">
                <label>Poll Title</label>
                <input
                  {...register('title')}
                  placeholder="e.g., Favorite Programming Language"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="field-error">{errors.title.message}</span>}
              </div>
              <div className="input-group">
                <label>Description (Optional)</label>
                <textarea
                  {...register('description')}
                  placeholder="Describe what this poll is about..."
                  rows={3}
                />
              </div>
            </div>

            <div className="questions-section">
              <div className="section-header" data-reveal>
                <h3><MessageSquare size={18} /> Questions</h3>
                <button
                  type="button"
                  className="secondary-button small"
                  onClick={() => appendQuestion({ question: '', required: false, options: [{ value: '' }, { value: '' }] })}
                >
                  <Plus size={16} /> Add Question
                </button>
              </div>

              {questionFields.map((qField, qIndex) => (
                <div key={qField.id} className="glass-card question-card">
                  <div className="question-header">
                    <span className="question-number">Question {qIndex + 1}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => removeQuestion(qIndex)}
                      disabled={questionFields.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="input-group">
                    <input
                      {...register(`questions.${qIndex}.question` as const)}
                      placeholder="Enter your question here..."
                      className={errors.questions?.[qIndex]?.question ? 'error' : ''}
                    />
                    {errors.questions?.[qIndex]?.question && (
                      <span className="field-error">{errors.questions[qIndex]?.question?.message}</span>
                    )}
                  </div>

                  <div className="question-options">
                    <label>Options</label>
                    <OptionsFieldArray qIndex={qIndex} control={control} register={register} errors={errors} />
                  </div>

                  <div className="question-footer">
                    <label className="checkbox-label">
                      <input type="checkbox" {...register(`questions.${qIndex}.required` as const)} />
                      Required Question
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-right-col">
            <div className="glass-card form-section sticky-section" data-reveal>
              <h3><Calendar size={18} /> Settings</h3>

              <div className="input-group">
                <label>Response Mode</label>
                <select {...register('responseMode')}>
                  <option value="anonymous">Anonymous (Public)</option>
                  <option value="authenticated">Authenticated (Login Required)</option>
                </select>
              </div>

              <div className="input-group">
                <label>Expiry Date</label>
                <input type="datetime-local" {...register('expiresAt')} />
              </div>

              <div className="info-box">
                <Info size={16} />
                <p>Polls are draft by default. You can publish them anytime from your dashboard.</p>
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-button" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={18} className="spinner" /> Creating...</> : 'Create Poll'}
                </button>
                <button type="button" className="secondary-button" onClick={() => navigate('/dashboard')}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const OptionsFieldArray = ({ qIndex, control, register, errors }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${qIndex}.options`
  });

  return (
    <div className="options-list">
      {fields.map((oField, oIndex) => (
        <div key={oField.id} className="option-input-wrapper">
          <input
            {...register(`questions.${qIndex}.options.${oIndex}.value` as const)}
            placeholder={`Option ${oIndex + 1}`}
            className={errors.questions?.[qIndex]?.options?.[oIndex]?.value ? 'error' : ''}
          />
          <button
            type="button"
            className="delete-btn small"
            onClick={() => remove(oIndex)}
            disabled={fields.length <= 2}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="add-option-btn"
        onClick={() => append({ value: '' })}
      >
        <Plus size={14} /> Add Option
      </button>
      {errors.questions?.[qIndex]?.options?.root && (
        <span className="field-error">{errors.questions[qIndex]?.options?.root?.message}</span>
      )}
    </div>
  );
};

export default CreatePoll;
