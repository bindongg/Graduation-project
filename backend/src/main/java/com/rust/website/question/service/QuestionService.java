package com.rust.website.question.service;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.ReplyDTO;
import com.rust.website.question.model.entity.Question;
import com.rust.website.question.model.entity.Reply;
import com.rust.website.question.model.entity.SubReply;
import com.rust.website.question.model.entity.myEnum.QuestionType;
import com.rust.website.question.repository.QuestionRepository;
import com.rust.website.question.repository.ReplyRepository;
import com.rust.website.question.repository.SubReplyRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final ReplyRepository replyRepository;
    private final SubReplyRepository subReplyRepository;

    @Transactional
    public void add(Question question, String username)
    {
        if(question.getQuestionType().equals(QuestionType.질문))
        {
            if(!questionRepository.existsById(question.getId()))
            {
                throw new IllegalArgumentException();
            }
        }
        question.setUser(userRepository.findById(username).orElseThrow(()->new IllegalArgumentException("No such element")));
        questionRepository.save(question);
    }

    @Transactional
    public void addReply(ReplyDTO replyDTO)
    {
        Reply reply = Reply.builder()
                .content(replyDTO.getContent())
                .question_(questionRepository.findById(replyDTO.getParent()).orElseThrow(()->new IllegalArgumentException("No such entity")))
                .user(userRepository.findById(replyDTO.getUserId()).orElseThrow(()->new IllegalArgumentException("No such Entity")))
                .build();
        replyRepository.save(reply);
    }

    @Transactional
    public void addSubReply(ReplyDTO replyDTO)
    {
        SubReply subReply = SubReply.builder()
                .content(replyDTO.getContent())
                .reply(replyRepository.findById(replyDTO.getParent()).orElseThrow(()->new IllegalArgumentException("No such entity")))
                .user(userRepository.findById(replyDTO.getUserId()).orElseThrow(()->new IllegalArgumentException("No such entity")))
                .build();
        subReplyRepository.save(subReply);
    }

    @Transactional(readOnly = true)
    public long getTotalByType(QuestionType questionType)
    {
        return questionRepository.countByQuestionType(questionType);
    }

    @Transactional(readOnly = true)
    public List<Question> getQuestionListByType(Pageable pageable, QuestionType questionType)
    {
        return questionRepository.findAllByQuestionTypeOrderByIdDesc(pageable, questionType).getContent();
    }

    @Transactional(readOnly = true)
    public Question getQuestion(int id)
    {
        return questionRepository.findById(id).orElseThrow(()->new IllegalArgumentException("No such entity"));
    }

    @Transactional
    public void deleteQuestion(int id)
    {
        questionRepository.deleteById(id);
    }

    @Transactional
    public void deleteReply(int id)
    {
        replyRepository.deleteById(id);
    }

    @Transactional
    public void deleteSubReply(int id)
    {
        subReplyRepository.deleteById(id);
    }

    @Transactional
    public void updateQuestion(int id, String title, String content, String exerciseId, String questionType)
    {
        Optional<Question> optQuestion = questionRepository.findById(id);
        if(optQuestion.isPresent())
        {
            if (questionType.equals(QuestionType.질문.toString()))
            {
                if(!questionRepository.existsById(Integer.parseInt(exerciseId)))
                {
                    throw new IllegalArgumentException();
                }
            }
            optQuestion.get().setTitle(title);
            optQuestion.get().setContent(content);
            optQuestion.get().setExerciseId(exerciseId == null ? null : Integer.parseInt(exerciseId));
        }
        else throw new IllegalArgumentException("No such entity");
    }

    @Transactional
    public void updateQuestionDone(int id)
    {
        Optional<Question> optQuestion = questionRepository.findById(id);
        if(optQuestion.isPresent())
        {
            optQuestion.get().setDone(true);
        }
        else throw new IllegalArgumentException("No such entity");
    }
}
